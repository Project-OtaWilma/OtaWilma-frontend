import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useTray, getTrayList, getPeriod } from '../../features/courses/traySlice';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

import styles from './CourseTray.module.css';

export default function CourseTray() {
    const [open, setOpen] = useState([]);
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);

    const initialize = () => {
        dispatch(getTrayList({auth: auth.token}))
    }

    const closePeriod = (hash) => setOpen(open.filter(h => h != hash))

    const loadPeriod = (hash) => {
        if(open.includes(hash)) return closePeriod(hash);

        dispatch(getPeriod({auth: auth.token, hash: hash}))
        setOpen([...open, hash]);
    }


    useEffect(() => { initialize() }, []);

    return (
        <>
            <div className={styles['content']}>
                <div className={styles['tray-list']}>
                    <TrayList open={open} onLoad={loadPeriod}/>
                </div>
                <div className={styles['tray-main']}>
                    <PeriodContainerObject open={open} onClose={closePeriod}/>
                </div>
                <div className={styles['tray-info']}>
                </div>
            </div>
        </>
    )
}

const TrayList = ({open, onLoad}) => {
    const tray = useSelector(useTray);

    if(tray.tray.isLoading) return <LoadingScreen className={styles['tray-loading-screen']} />
    
    
    return (
        <>
            {
                Object.keys(tray.tray.list).map((school, i) => {
                    const periods = tray.tray.list[school];
                    
                    return <ListTrayObject key={i} open={open} name={school} periods={periods} onLoad={onLoad}/>
                })
            }
        </>
    )
}

const ListTrayObject = ({open, name, periods, onLoad}) => {
    return (
        <div className={styles['tray']}>
            <h1>{name}</h1>
            <div className={styles['period-list']}>
                {
                    periods.map((period, i) => {
                        return <ListPeriodObject open={open} key={i} period={period} onLoad={onLoad}/>
                    })
                }
            </div>
        </div>
    )
}

const ListPeriodObject = ({open, period, onLoad}) => {
    return (
        <h2 
            className={open.includes(period.hash) ? styles['selected'] : null}
            onClick={() => onLoad(period.hash)}
        >
            {period.name}
        </h2>
    )
}

const PeriodContainerObject = ({open, onClose}) => {
    const tray = useSelector(useTray);
    const periods = tray.periods;

    if(open.length == 0) return <></>

    return (
        <>
            {
                open.map((hash, i) => {
                    const period = periods[hash];
                    return <TrayPeriodObject key={i} hash={hash} period={period} onClose={onClose}/>
                })
            }
        </>
    )
}

const TrayPeriodObject = ({hash, period, onClose}) => {
    const [hidden, setHidden] = useState(false);

    if(period.isLoading) return <div className={styles['period']}>
        <h1>...</h1>
    </div>

    return (
        <div style={{order: period.index}} className={`${styles['period']} ${hidden ? styles['closed'] : styles['open']}`}>
            <h1>{period.name}</h1>
            <div className={styles['period-actions']}>
                <button onClick={() => setHidden(!hidden)} className={styles['hide-period']}>
                    <h6 className={hidden ? styles['open'] : styles['closed']}></h6>
                </button>
                <button onClick={() => onClose(hash)} className={styles['disable-period']}>

                </button>
            </div>
            <>
                {
                    period.bars.map((bar, i) => {
                        return <TrayBarObject key={i} bar={bar} />
                    })
                }
            </>
        </div>
    )
}

const TrayBarObject = ({bar}) => {
    const tray = useSelector(useTray);
    const courses = tray.courses;

    return (
        <div className={styles['bar']}>
            <h2>{bar.name}</h2>
            <div className={styles['course-list']}>
                {
                    bar.courses.map((hash, i) => {
                        const course = courses[hash];
                        
                        return <TrayCourseObject key={i} course={course}/>
                    })
                }
            </div>
        </div>
    )
}

const TrayCourseObject = ({course}) => {
    return (
        <div className={course.class.split(' ').map(c => styles[c]).join(' ')}>
            {course.code}
            <div className={styles['course-data']}>
                <h2>{course.name}</h2>
                <h2>{course.info.teacher}</h2>
                {course.info.locked ? <h2>Kurssi on lukittu</h2> : null}
                {course.info.full ? <h2>Kurssi on jo täynnä</h2> : null}
            </div>
        </div>
    )
}

