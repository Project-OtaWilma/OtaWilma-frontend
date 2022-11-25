import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import {useGrades, getGradebook} from '../../features/grades/gradeSlice';
import {useLops, getCourse, getLops} from '../../features/grades/lopsSlice';
import { LoadingScreen, PlaceHolder } from '../LoadingScreen/LoadingScreen';

import styles from './Gradebook.module.css';


export default function Gradebook() {
    const [selected, setLops] = useState('LOPS2021');
    const [course, setCourse] = useState({subject: null, code: null});
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const lops = useSelector(useLops);
    const grades = useSelector(useGrades);

    const initialize = () => {
        dispatch(getLops({lops: 'LOPS2021'}));
        dispatch(getGradebook({auth: auth.token}));
    }

    const loadLops = (lops) => {
        if(selected == lops) return;

        dispatch(getLops({lops: lops}));
        setCourse({subject: null, code: null});
        setLops(lops);
    }

    const loadCourse = (subject, code) => {
        dispatch(getCourse({lops: selected, subject: subject, code : code}));
        setCourse({subject: subject, code: code});
    }
    
    useEffect(() => { initialize() }, []);

    return (
        <div className={styles['content']}>
            <div className={styles['main']}>
                <div className={styles['course-container']}>
                    <CourseList currentLops={selected} grades={grades} onLoad={loadCourse}/>
                </div>
                <div className={styles['lops-selector']}>
                    <h6 onClick={() => loadLops('LOPS2021')} className={selected == 'LOPS2021' ? styles['selected'] : null}>LOPS2021</h6>
                    <h6 onClick={() => loadLops('LOPS2016')} className={selected == 'LOPS2016' ? styles['selected'] : null}>LOPS2016</h6>
                </div>
                <div className={styles['course-info-container']}>
                    <OverviewObject grades={grades} />
                    <CourseInfoObject list={lops.lops[selected]} course={course} />
                </div>
            </div>
            <h1>Grades</h1>
        </div>
    )
}

const CourseList = ({currentLops, grades, onLoad}) => {
    const lops = useSelector(useLops);
    const list = lops.lops[currentLops];
    
    if(list.isLoading || !list.hasLoaded) return <LoadingScreen className={styles['course-loading-screen']} />
    if(grades.isLoading || !grades.hasLoaded) return <LoadingScreen className={styles['course-loading-screen']} />

    return (
        <>
            {
                Object.keys(list['content']).map((subject, i) => {
                    const courses = list['content'][subject];
                    const grade = grades['grades'][subject];

                    return <SubjectObject key={i} subject={subject} courses={courses} grade={grade ? grade : null} onLoad={onLoad} />
                })
            }
        </>
    )
}

const SubjectObject = ({subject, courses, grade, onLoad}) => {
    const subjectGrade = grade ? grade['grade'] : null;

    return (
        <div className={styles['subject']}>
            <ul><a>{subject} </a><a>{subjectGrade}</a></ul>
            <div className={styles['course-list']}>
                {
                    Object.keys(courses).map((code, i) => {
                        const course = courses[code];
                        const courseGrade = (grade ? grade['courses'] : {})[`${course.code} ${course.name}`];


                        return <CourseObject key={i} course={course} grade={courseGrade ? courseGrade : null} onLoad={onLoad} />
                    })
                }
            </div>
        </div>
    )
}

const CourseObject = ({course, grade, onLoad}) => {
    return (
        <div className={grade ? styles[`${course.type}-graded`] : styles[course.type]} onClick={() => onLoad(course.subject, course.code)}>
            <h4>{grade ? (grade['grade'] ? grade['grade'] : '?')  : course.code}</h4>
            <div className={styles['course-info']}>
                <h2>{course.name}</h2>
            </div>
        </div>
    )
}

const OverviewObject = ({grades}) => {
    if(grades.isLoading || !grades.hasLoaded) return <LoadingScreen className={styles['course-loading-screen']} />

    const overview = grades['overview'];
    return(
        <div className={styles['overview-content']}>
        {
            Object.keys(overview).map((key, i) => {
                const value = overview[key];

                return value ? <ul key={i}><a>{`${key}: `}</a><a>{value}</a></ul> : null;
            })
        }
        </div>
    )
}

const CourseInfoObject = ({list, course}) => {
    if(!course.subject ||!course.code) return <></>
    if(list.isLoading || !list.hasLoaded) return <LoadingScreen className={styles['course-loading-screen']} />

    const info = list['content'][course.subject][course.code];

    return <InfoObject info={info} />
}

const InfoObject = ({info}) => {
    const translations = {
        'subject': 'Oppiaine',
        'code': 'Tunnus',
        'name': 'Nimi',
    }

    if(!info.hasLoaded) return <div className={`loading-indicator ${styles['course-loading-screen']}`} />
    
    return (
        <div className={styles['course-lops']}>
            <h1>{info['name']}</h1>
            {
                Object.keys(info).filter(key => !['type', 'hasLoaded', 'name'].includes(key)).map((key, i) => {
                    const value = info[key];
                    const keyValue = `${Object.keys(translations).includes(key) ? translations[key] : key}: `;
                    
                    return (
                        <ul key={i}><a>{keyValue}</a><a className={styles[value]} dangerouslySetInnerHTML={{__html: value}}></a></ul>
                    )
                })
            }
        </div>
    )
}
