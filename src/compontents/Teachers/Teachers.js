import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTeachers, getTeachers, getTeacher } from '../../features/teachers/teacherSlice';
import { LoadingScreen, PlaceHolder } from '../LoadingScreen/LoadingScreen';
import { useParams } from 'react-router-dom';

import styles from './Teachers.module.css';

export default function Teachers() {
    const params = useParams();
    const [current, setCurrent] = useState(null);
    const dispatch = useDispatch();

    const initialize = () => {
        dispatch(getTeachers());
        if(params.id) loadteacherById(params.id);
    }

    const loadteacherById = (id) => {
        dispatch(getTeacher({name: id, isId: true}));
        setCurrent(id);
    }
    
    useEffect(() => { initialize() }, []);

    return (
        <div className={styles['content']}>
            <div className={styles['side-bar']}>
                <TeacherList onLoad={loadteacherById}/>
            </div>
            <div className={styles['main']}>
                <TeacherInfoContainer current={current} />
            </div>
        </div>  
    )
}

const TeacherList = ({onLoad}) => {
    const teachers = useSelector(useTeachers);
    const list = teachers.list;

    if(list.isLoading) return <LoadingScreen className={styles['teacher-loading-screen']} />

    return (
        <>
            {
                Object.keys(list['content']).map((letter, i) => {
                    const teachers = list['content'][letter];

                    return (
                        <div key={i}>
                            <h1>{letter}</h1>
                            {
                                teachers.map((teacher, i) => {
                                    return <TeacherObject key={i} teacher={teacher} onLoad={onLoad} />
                                })
                            }
                        </div>
                    )
                })
            }
        </>
    )
}

const TeacherObject = ({teacher, onLoad}) => {

    return (
        <div className={styles['teacher']}>
            <h2 onClick={() => onLoad(teacher.hash)}>{teacher.name}</h2>
            <h3>{teacher.task}</h3>
        </div>
    )
}
const TeacherInfoContainer = ({current}) => {
    const teachers = useSelector(useTeachers);
    const map = teachers.teachers;

    

    if(!current) return <PlaceHolder className={styles['teacher-placeholder']}/>
    if(!map[current]) return <LoadingScreen className={styles['teacher-loading-screen']} />
    if(map[current].isLoading) return <LoadingScreen className={styles['teacher-loading-screen']} />

    const teacher = map[current];
    const tasks = teacher.task.replaceAll(' ja ', '/').replaceAll(', ', '/').split('/');
    const nameArray = teacher.name.split(' ');
    const gmail = nameArray.length > 2 ? [[nameArray[0], nameArray[1]].join(''), nameArray[2]].join('.').toLowerCase()  + '@opetus.espoo.fi' : nameArray.join('.').toLowerCase() + '@opetus.espoo.fi'
    
    return (
        <>
            <div className={styles['left']}>
                <h1>{teacher.name}</h1>
                <div className={styles['actions']}>
                    <div className={styles['open']}>
                        <div className={styles['icon']}></div>
                        <h2>Avaa Wilmassa</h2>
                    </div>
                    <div className={styles['review']}>
                        <div className={styles['icon']}></div>
                        <h2>Arvioi opettajaa</h2>
                    </div>
                </div>
                <div className={styles['task-list']}>
                    <h2>Tehtävät</h2>
                    {
                        tasks.map((task, i) => {
                           return task ? <h3 key={i}>{task}</h3> : null
                        })
                    }
                </div>
                <div className={styles['contact-info']}>
                    <h2>Yhteystiedot</h2>
                    <h3>{gmail}</h3>
                </div>
                <div className={styles['comments']}>
                    <h2>Julkiset kommentit</h2>
                    {
                        teacher.feedback['comments'].map((comment, i) => {
                            return <h3 key={i}>{comment}</h3>
                        })
                    }
                </div>
            </div>
            <div className={styles['right']}>
                <div className={styles['teacher-adjectives']}>
                    <TeacherAdjectives name={teacher.name} feedback={teacher.feedback} />
                </div>
                <h1>Opettajan opetustyyliä on arviotu seuraavasti</h1>
                {
                    Object.keys(teacher.feedback).filter(k => !['comments', 'teacher-adjectives', 'reviews'].includes(k)).map((key, i) => {
                        const value = teacher.feedback[key];
                        return <TeacherCard key={i} k={key} value={value}/>
                    })
                }
            </div>
        </>
    )
}

const TeacherAdjectives = ({name, feedback}) => {
    return (
        <div className={styles['adjective-list']}>
            <h1>Opettajaa kuvaavat hyvin adjektiivit</h1>
            <h3>
                <strong>{feedback.reviews}</strong> opiskelijaa ovat arvioineet opettajaa <strong>{name}</strong> seuraavasti:
            </h3>
            {
                feedback['teacher-adjectives'].map((a, i) => {
                    return (
                        <div key={i} className={styles['adjective']} style={{width: `${a.percentage}%`}}>
                            <h2>{a.adjective}</h2>
                            <h3>{`${Number.parseFloat(a.percentage).toFixed(0)}%`}</h3>
                        </div>
                    )
                })
            }
        </div>
    )
}

const TeacherCard = ({k, value}) => {
    const keys = {
        'course-pace': {options: ['Hidas', 'Tavallinen', 'Nopea'], label: 'Tuntien tahti'},
        'course-applicability': {options: ['Perusteet', 'Tavallinen', 'Soveltava'], label: 'Tuntien soveltavuus'},
        'course-difficulty': {options: ['Helppo', 'Tavallinen', 'Haastava'], label: 'Kokeiden haastavuus'},
        'course-style': {options: ['Tehtäväpainotteinen', 'Satunnaista', 'Teoriapainotteinen'], label: 'Tuntien tyyli'},
    }

    const numValue = Number.parseFloat(value);
    let label = '';

    if((numValue * 180) <= 120) label = keys[k].options[0];
    if((numValue * 180) > 120 && numValue * 180 < 240) label = keys[k].options[1];
    if((numValue * 180) >= 240) label = keys[k].options[2];

    return (
        <div className={styles['teacher-card']}>
            <div className={styles['card']}>
                <div className={styles['title']}>
                    <h3>Opettajan pitämien</h3>
                    <h1>{keys[k].label}</h1>
                </div>
                {Number.isNaN(numValue) ? <h6>Ei riittävästi arvioita</h6> : null}
                <div className={styles['circular-value']} style={{
                    display: (Number.isNaN(numValue) ? 'none' : 'flex'),
                    background: `conic-gradient(var(--accent-main) 0deg ${Math.max(numValue * 180, 5)}deg, transparent 0deg)`
                }}>
                    <div className={styles["pointer"]}></div>
                    <div className={styles["pointer"]}></div>
                    <div className={styles["pointer"]}></div>
                    <div className={styles["inner-circle"]}>
                        <h1>{label}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

