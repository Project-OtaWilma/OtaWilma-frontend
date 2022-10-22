import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import {useGrades, getGradebook} from '../../features/grades/gradeSlice';
import {useLops, getLops} from '../../features/grades/lopsSlice';

import styles from './Gradebook.module.css';
import { combineReducers } from '@reduxjs/toolkit';


export default function Gradebook() {
    const [selected, setLops] = useState('LOPS2021');
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const lops = useSelector(useLops);
    const grades = useSelector(useGrades);

    const initialize = () => {
        dispatch(getLops({lops: 'LOPS2021'}))
        dispatch(getGradebook({auth: auth.token}))
    }

    useEffect(() => { initialize() }, []);

    return (
        <div className={styles['content']}>
            <div className={styles['main']}>
                <div className={styles['course-container']}>
                    <Courses lops={lops.lops[selected]} />
                </div>
                <div className={styles['lops-selector']}>
                    <h6 onClick={() => setLops('LOPS2021')} className={selected == 'LOPS2021' ? styles['selected'] : null}>LOPS2021</h6>
                    <h6 onClick={() => setLops('LOPS2016')} className={selected == 'LOPS2016' ? styles['selected'] : null}>LOPS2016</h6>
                </div>
                <div className={styles['overview-container']}>
                    
                </div>
            </div>
            <h1>Grades</h1>
        </div>
    )
}

const Courses = ({lops}) => {
    if(lops.isLoading) return <h2>Loading...</h2>

    return (
        <>
            {
                Object.keys(lops['content']).map((subject, i) => {
                    const courses = lops['content'][subject];

                    return (
                        <div key={i} className={styles['subject']}>
                            <SubjectObject subject={subject} courses={courses} />
                        </div>
                    )
                })
            }
        </>
    )
}

const SubjectObject = ({subject, courses}) => {
    return (
        <>
            <ul><a>{subject} </a><a id="Korkeakouluopinnot"></a></ul>
            <div className={styles['course-list']}>
                {
                    courses.map((course, i) => {
                        return <CourseObject key={i} course={course} />
                    })
                }
            </div>
        </>
    )
}

const CourseObject = ({course}) => {
    //
    // console.log(course);
    return (
        <div className={styles[course.type]}>
            <h4>{course.code}</h4>
        </div>
    )
}