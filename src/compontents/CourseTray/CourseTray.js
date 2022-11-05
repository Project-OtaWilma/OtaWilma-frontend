import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useTray, getTrayList, getPeriod } from '../../features/courses/traySlice';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

import styles from './CourseTray.module.css';

const subjects = {
    'BI': 'Biologia',
    'EAB': 'B-Espanja',
    'ENA': 'A-Englanti',
    'ENAAE': 'Advanced English',
    'ENATU': 'Englannin tukiopetus',
    'ET': 'Elämänkatsomus',
    'FI': 'Filosofia',
    'FY': 'Fysiikka',
    'GE': 'Maantieto',
    'HI': 'Historia',
    'KE': 'Kemia',
    'KIB': 'B-Kiina',
    'KU': 'Kuvaamataito',
    'LI': 'Liikunta',
    'MAA': 'Matematiikan pitkä oppimäärä',
    'MAB': 'Matematiikan lyhyt oppimäärä',
    'MAY': 'Matematiikan yhteinen oppimäärä',
    'ME': 'Mediaopinnot',
    'MU': 'Musiikki',
    'OPA': 'Opinto-ohjaus [A-luokka]',
    'OPB': 'Opinto-ohjaus [B-luokka]',
    'OPC': 'Opinto-ohjaus [C-luokka]',
    'OPD': 'Opinto-ohjaus [D-luokka]',
    'OPE': 'Opinto-ohjaus [E-luokka]',
    'OPF': 'Opinto-ohjaus [F-luokka]',
    'OPG': 'Opinto-ohjaus [G-luokka]',
    'OPH': 'Opinto-ohjaus [H-luokka]',
    'OPI': 'Opinto-ohjaus [I-luokka]',
    'OPK': 'Opinto-ohjaus [K-luokka]',
    'OPL': 'Opinto-ohjaus [L-luokka]',
    'OPM': 'Opinto-ohjaus [M-luokka]',
    'OPN': 'Opinto-ohjaus [N-luokka]',
    'OPO': 'Opinto-ohjaus [O-luokka]',
    'OPP': 'Opinto-ohjaus [P-luokka]',
    'OTA': 'Ota-opinnot',
    'PS': 'Psykologia',
    'RAA': 'A-ranska',
    'RAB': 'B-ranska',
    'RUA': 'A-ruotsi',
    'RUB': 'B-ruotsi',
    'SAA': 'A-saksa',
    'SAB': 'B-saksa',
    'TE': 'Terveystieto',
    'TEA': 'Teatteri',
    'TEC': 'Teknologia',
    'TO': 'Temaattiset opinnot [A-luokka]',
    'TOA': 'Temaattiset opinnot',
    'TOB': 'Temaattiset opinnot',
    'TOC': 'Temaattiset opinnot',
    'TOE': 'Temaattiset opinnot',
    'TOF': 'Temaattiset opinnot',
    'TOG': 'Temaattiset opinnot',
    'TOH': 'Temaattiset opinnot',
    'TOI': 'Temaattiset opinnot',
    'TOK': 'Temaattiset opinnot',
    'TOL': 'Temaattiset opinnot',
    'TOM': 'Temaattiset opinnot',
    'TON': 'Temaattiset opinnot',
    'TOO': 'Temaattiset opinnot',
    'TOP': 'Temaattiset opinnot',
    'UE': 'Uskonto',
    'YH': 'Yhteiskuntaoppi',
    'ÄI': 'Äidinkieli',
    'ÄITU': 'Äidinkielen tukiopetus'
    
}

export default function CourseTray() {
    const [open, setOpen] = useState([]);
    const [filter, setFilter] = useState({});
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

    const applyFilter = (filter) => {
        setFilter(filter);
    }

    useEffect(() => { initialize() }, []);

    return (
        <>
            <div className={styles['content']}>
                <div className={styles['tray-list']}>
                    <TrayList open={open} onLoad={loadPeriod}/>
                </div>
                <div className={styles['tray-main']}>
                    <PeriodContainer open={open} onClose={closePeriod}/>
                </div>
                <div className={styles['tray-info']}>
                    <TrayInfoContainer filter={filter}  setFilter={applyFilter}/>
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

const PeriodContainer = ({open, onClose}) => {
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
        <div 
            className={course.class.split(' ').map(c => styles[c]).join(' ')}
            onClick={() => console.log(course)}
        >
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

const TrayInfoContainer = ({filter, setFilter}) => {
    return (
        <>
            <div className={styles['schedule']}>

            </div>
            <h1>Toiminnot</h1>
            <SearchBarObject setFilter={setFilter} />
            <FilterObject setFilter={setFilter}/>
        </>
    )
}

const SearchBarObject = ({setFilter}) => {
    const tray = useSelector(useTray);
    const courses = tray.courses;

    const selectedCourses = Object.keys(courses).filter(hash => courses[hash].isSelected).length;
    
    return (
        <>
            <form>
                <h2>Hae kurssia</h2>
                <input type='text' placeholder='Esim. MAA15.1' />
                <button>Hae</button>
            </form>
            <h3 className={styles['search-result']}>
                
            </h3>
        </>
    )
}

const FilterObject = ({setFilter}) => {
    const [current, setCurrent] = useState('all');
    const tray = useSelector(useTray);
    const courses = tray.courses;

    const filters = {
        all: [],
        subject: [],
        teacher: [],
        lops: [
            'LOPS2021 Nykyinen lukion opetussuunnitelma [2021]',
            'LOPS2016 Vanha lukion opetussuunnitelma [2016]',
        ]
    }

    filters.subject = Object.keys(courses).reduce((list, hash) => {
        const course = courses[hash];

        const subject = (course.subject.endsWith('D') ? course.subject.substring(0, course.length - 1) : course.subject).replaceAll('w', '');

        if(!list.includes(subject) && Object.keys(subjects).includes(subject)) return [...list, subject]

        return list
    }, [])

    filters.teacher = Object.keys(courses).reduce((list, hash) => {
        const course = courses[hash];
        const teacher = course.info.teacher;

        if(!list.includes(teacher)) return [...list, teacher]
        
        return list
    }, [])

    return (
        <div className={styles['filter-container']}>
            <h1>Suodata kursseja</h1>
            <div className={styles['filters']}>
                <h4 onClick={() => setCurrent('all')} className={current == 'all' ? styles['selected-filter'] : null}>Kaikki</h4>
                <h4 onClick={() => setCurrent('subject')} className={current == 'subject' ? styles['selected-filter'] : null}>Oppiaine</h4>
                <h4 onClick={() => setCurrent('teacher')} className={current == 'teacher' ? styles['selected-filter'] : null}>Opettaja</h4>
                <h4 onClick={() => setCurrent('lops')} className={current == 'lops' ? styles['selected-filter'] : null}>LOPS</h4>
            </div>
            <div className={styles['filter-list']}>
                {
                    filters[current].sort().map((subject, i) => {
                        const s = subject.split(' ');

                        const key = s.shift();
                        const value = s.join(' ');

                        return (
                            <ul key={i}>
                                <input type='checkbox' />
                                <a>{`${key} - `}</a>
                                <a>{Object.keys(subjects).includes(key) ? subjects[key] : value}</a>
                            </ul>
                        )
                    })
                }
            </div>
        </div>
    )
}

