import React, { useState, useEffect } from 'react';

import styles from './YoResults.module.css';
import { useSelector } from 'react-redux';
import { useGrades } from '../../features/grades/gradeSlice';

import TABLE from './yo-results-subject.json';
import SUBJECTS from './yo-subjects.json';

export default function YoResults() {
    const grades = useSelector(useGrades);
    const [current, setCurrent] = useState(0);
    const [subject, setSubject] = useState(null);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const s = grades.yoResults.at(0);
        if (!s) return;
        setSubject(s.subject.short);
        setPoints(s.points);
    }, [grades.yoResults]);

    const onSelect = (idx) => {
        setCurrent(idx)
        setSubject(grades.yoResults.at(idx).subject.short);
        setPoints(grades.yoResults.at(idx).points);
    }

    const inc = () => {
        if (points >= 299) return;
        setPoints(points + 1);
    }

    const dec = () => {
        if (points <= 1) return;
        setPoints(points - 1);
    }

    return (
        <div className={styles['content']}>
            <div className={styles['side-bar']}>
                <YoSubjectList current={current} onClick={e => onSelect(e)} />
            </div>
            <div className={styles['results']}>
                <div className={styles['top']}>
                    <YoResultInfo current={current} />
                </div>
                <div className={styles['bottom']}>
                    <div className={styles['table']}>
                        <Table current={subject} inc={inc} dec={dec} ownPoints={points} />
                    </div>
                </div>  
            </div>
        </div>
    )
}

const YoSubjectList = ({current, onClick}) => {
    const grades = useSelector(useGrades);

    return (
        <>
            {grades.yoResults.map((result, i) => {
                return <YoListEntry key={i} result={result} active={current == i} onClick={() => onClick(i)} />
            })}
        </>
    )
}

const YoListEntry = ({result, active, onClick}) => {
    const { subject, date, points } = result;

    return (
        <div
            onClick={onClick}
            className={`${styles['yo-object']} ${active ? styles['selected'] : ''}`}
        >
            <h1>{subject.full}</h1>
            <ul>
                <a>YO-Oppiaine: </a>
                <a>{subject.short}</a>
            </ul>
            <ul>
                <a>Ajankohta: </a>
                <a>{date}</a>
            </ul>
            {points ? <h6>Arvioitu</h6> : <h6 className={styles['no']}>Ei arvioitu</h6>}
        </div>
    )
}

const YoResultInfo = ({current}) => {
    const result = useSelector(useGrades).yoResults.at(current);
    const grade = result.grade;

    const overview = (result.pointsOvreview ?? '').split(',');

    return (
        <>
            <div className={styles['info']}>
                <h1>Alustavat pisteet</h1>
                {result.pointsOvreview ? <h2 className={styles['overview']}>
                    {result.points ? overview.map(p => p == '-' || p == '0' ? <a style={{opacity: 0.5}}>{p} </a> : <a>{p} </a>) : null}
                    <a>= {result.points}</a>
                </h2> : <h2>Ei arvioitu</h2>}
                <h1>Lopullinen arvosana</h1>
                <h2 className={!grade ? styles['waiting'] : null}>{grade ?? 'julkaistaan 9.11.2023'}</h2>
            </div>
        </>
    )
}

const Table = ({current, inc, dec, ownPoints}) => {
    const result = useSelector(useGrades).yoResults.find(r => r.subject.short == current)
    const key = SUBJECTS[current];
    if (!key) return <></>

    const entries = TABLE[key];
    if (!entries) return <></>

    const yearList = Object.keys(entries);
    const { 0 : first , [yearList.length - 1] : last } = yearList;

    return (
        <>
            <div className={styles['header']}>
                {ownPoints ? <div className={styles['points']}>
                    <h1>Omat pisteesi</h1>
                    <div className={styles['controls']}>
                        <button onClick={dec}>{"<"}</button>
                        <h3>{ownPoints}</h3>
                        <button onClick={inc}>{">"}</button>
                    </div>
                </div> : null}
                <div className={styles['title']}>
                    <h1>{key}</h1>
                    <h2>{last} - {first}</h2>
                </div>
            </div>
            <div className={`${styles['column']} ${styles['head']}`}>
                <div className={styles['row']}>
                    <h1>Ajankohta</h1>
                </div>
                <div className={styles['row']}>
                    <h1>L</h1>
                </div>
                <div className={styles['row']}>
                    <h1>E</h1>
                </div>
                <div className={styles['row']}>
                    <h1>M</h1>
                </div>
                <div className={styles['row']}>
                    <h1>C</h1>
                </div>
                <div className={styles['row']}>
                    <h1>B</h1>
                </div>
                <div className={styles['row']}>
                    <h1>A</h1>
                </div>
            </div>
            {yearList.map((year, i) => {
                const points = entries[year];
                return <YoResultRow key={`s-${i}`} year={year} points={points} ownPoints={ownPoints} />
            })}
        </>
    )
}

const YoResultRow = ({year, points, ownPoints}) => {
    const limits = points.slice(0, 6);
    const map = determineGrade(limits, ownPoints);

    return (
        <div className={styles['column']}>
            <div className={styles['row']}>
                <h1>{year}</h1>
            </div>
            {limits.map((l, i) => {
                return <div className={`${styles['row']} ${map[i] ? styles['active'] : ''}`}>
                    <h1>{l}</h1>
                </div>
            })}
        </div>
    )
}

const determineGrade = (list = [], p) => {
    if (!p) return [];
    if (p >= list.at(0)) return [true, false, false, false, false, false];
    if (p <= list.at(-1)) return [false ,false, false, false, false, true];

    const e = list.map((l, i) => {
        if ((p < list[i - 1] && p > list[i + 1]) || p == l) {
            return true;
        }
        return false
    });

    // ???
    return e.reduceRight((a, c) => [...a, a.includes(true) ? false : c], []).reverse()
}