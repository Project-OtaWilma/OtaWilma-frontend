import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useTray, getTrayList, getPeriod, getTrayCourse } from '../../features/courses/traySlice';
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
    'MAA': 'Matematiikan [Pitkä]',
    'MAB': 'Matematiikan [Lyhyt]',
    'MAY': 'Matematiikka [Yhteinen]',
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
    const [filter, setFilter] = useState({
        search: null,
        subject: [],
        teacher: [],
        lops: []
    });
    const [course, setCourse] = useState(null);
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

    const loadCourse = (hash) => {
        dispatch(getTrayCourse({auth: auth.token, hash: hash}))
        setCourse(hash);
    }

    const applyFilter = (f) => {
        if (f.type == 'search') return setFilter({...filter, search: f.value});

        if(filter[f.type].includes(f.value)) {
            return setFilter({...filter, [f.type]: filter[f.type].filter(n => n != f.value)})
        }

        setFilter({...filter, [f.type]: [...filter[f.type], f.value]})
    }
    

    useEffect(() => { initialize() }, []);

    return (
        <>
            <div className={styles['content']}>
                <div className={styles['tray-list']}>
                    <TrayList open={open} onLoad={loadPeriod}/>
                </div>
                <div className={styles['tray-main']}>
                    <PeriodContainer open={open} filter={filter} onLoad={loadCourse} onClose={closePeriod}/>
                </div>
                <div className={styles['tray-info']}>
                    <TrayInfoContainer open={open} course={course} filter={filter} setFilter={applyFilter}/>
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

const PeriodContainer = ({open, filter, onLoad, onClose}) => {
    const tray = useSelector(useTray);
    const periods = tray.periods;

    if(open.length == 0) return <></>

    return (
        <>
            {
                open.map((hash, i) => {
                    const period = periods[hash];
                    return <TrayPeriodObject key={i} hash={hash} period={period} filter={filter} onLoad={onLoad} onClose={onClose}/>
                })
            }
        </>
    )
}

const TrayPeriodObject = ({hash, period, filter, onLoad, onClose}) => {
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
                        return <TrayBarObject key={i} bar={bar} filter={filter} onLoad={onLoad} />
                    })
                }
            </>
        </div>
    )
}

const TrayBarObject = ({bar, filter, onLoad}) => {
    const tray = useSelector(useTray);
    const courses = tray.courses;

    return (
        <div className={styles['bar']}>
            <h2>{bar.name}</h2>
            <div className={styles['course-list']}>
                {
                    bar.courses.map((hash, i) => {
                        const course = courses[hash];
                        
                        return <TrayCourseObject key={i} course={course} filter={filter} onLoad={onLoad} />
                    })
                }
            </div>
        </div>
    )
}

const TrayCourseObject = ({course, filter, onLoad}) => {

    if(filter.search) if(!course.name.toLowerCase().includes(filter.search)) return <></>
    if(filter.subject.length > 0) if(filter.subject.filter(r => course.code.includes(r)).length == 0) return <></>
    if(filter.teacher.length > 0) if(filter.teacher.filter(r => !(!course.info.teacher) && course.info.teacher.includes(r)).length == 0) return <></>
    if(filter.lops.length > 0) if(filter.lops.filter(r => course.lops == r).length == 0) return <></>
    return (
        <div 
            className={course.class.split(' ').map(c => styles[c]).join(' ')}
            onClick={() => onLoad(course.hash)}
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

const TrayInfoContainer = ({open, course, filter, setFilter}) => {
    return (
        <>
            <div className={styles['schedule']}>
                
            </div>
            <h1>Toiminnot</h1>
            {open.length > 0 ? <SearchBarObject setFilter={setFilter} /> : <></>}
            {open.length > 0 ? <FilterObject filter={filter} setFilter={setFilter}/> : <></>}
            <h1>Tietoa kurssista</h1>
            {open.length > 0 ? <CourseInfoObject course={course}/> : <></>}
        </>
    )
}

const SearchBarObject = ({setFilter}) => {
    const [term, setTerm] = useState(null);

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <h2>Hae kurssia</h2>
                <input type='text' placeholder='Esim. MAA15.1' onChange={(e) => setTerm(e.target.value ? e.target.value : null)}/>
                <button onClick={() => setFilter({type: 'search', value: term})}>Hae</button>
            </form>
        </>
    )
}

const FilterObject = ({filter, setFilter}) => {
    const [current, setCurrent] = useState('subject');
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
    }, []).sort()

    filters.teacher = Object.keys(courses).reduce((list, hash) => {
        const course = courses[hash];
        const teacher = course.info.teacher ? course.info.teacher : '';

        if(teacher != '' && !list.includes(teacher) && !teacher.includes('/')) return [...list, teacher]
        
        return list
    }, []).sort()

    return (
        <div className={styles['filter-container']}>
            <h1>Suodata kursseja</h1>
            <div className={styles['filters']}>
                <h4 onClick={() => setCurrent('subject')} className={current == 'subject' ? styles['selected-filter'] : null}>Oppiaine</h4>
                <h4 onClick={() => setCurrent('teacher')} className={current == 'teacher' ? styles['selected-filter'] : null}>Opettaja</h4>
                <h4 onClick={() => setCurrent('lops')} className={current == 'lops' ? styles['selected-filter'] : null}>LOPS</h4>
            </div>
            <div className={styles['filter-list']}>
                {
                    filters[current].map((subject, i) => {
                        const s = subject.split(' ');

                        const key = s.shift();
                        const value = s.join(' ');


                        return (
                            <ul key={key}>
                                <input type='checkbox' checked={filter[current].includes(key)} onChange={() => {setFilter({type: current, value: key})}}/>
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

const CourseInfoObject = ({course: hash}) => {
    const tray = useSelector(useTray);
    const courses = tray.courses;

    if(!courses[hash]) return <></>
    if(courses[hash].isLoading) return <LoadingScreen className={styles['tray-info-loading-screen']} />
    const course = courses[hash];
    
    
    return (
        <div className={styles['course-info']}>
            <h1>{course.name}</h1>
            <h3>{course.code}</h3>
            <button className={styles['course-action']}>
                {!course.isSelected ? 'Valitse kurssi' : 'Poista valinta'}
            </button>
            {
                Object.keys(course).filter(k => !['name', 'code', 'hash', 'isLoading', 'class', 'info', 'isSelected', 'subject'].includes(k)).map((key, i) => {
                    const keyValue = `${key}: `;
                    const value = course[key];
                    return (
                        <>
                            <ul key={i}>
                                <a>{keyValue}</a>
                                <a dangerouslySetInnerHTML={{__html: value}}></a>
                            </ul>
                        </>
                    )
                })
            }
        </div>
    )
}

