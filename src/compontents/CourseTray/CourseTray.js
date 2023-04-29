import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useSchedule, getWeek } from '../../features/schedule/scheduleSlice'
import { useTray, getTrayList, getPeriod, getTrayCourse, updateSelections, getFriendSelections, selectCourse, deselectCourse, resetError, getOwnPlan, planCourse, deplanCourse, getFriendsPlans } from '../../features/courses/traySlice';
import { BlurLayer, LoadingScreen, PlaceHolder } from '../LoadingScreen/LoadingScreen';

import styles from './CourseTray.module.css';
import { Link } from 'react-router-dom';
const { subjects } = require('./subjects.json');

const periods = {
    '70F27363_36379': new Date('2022-08-15'), //1A.
    '70F27363_36380': new Date('2022-09-12'), //1B.
    '70F27363_36411': new Date('2022-10-10'), //2A.
    '70F27363_36412': new Date('2022-11-07'), //2B.
    '70F27363_36413': new Date('2022-12-12'), //3A.
    '70F27363_36414': new Date('2023-01-16'), //3B.
    '70F27363_36415': new Date('2023-02-13'), //4A.
    '70F27363_36416': new Date('2023-03-13'), //4B.
    '70F27363_36417': new Date('2023-04-17'), //5A.
    '70F27363_36418': new Date('2023-05-08') //5B.
}

export default function CourseTray() {
    const [open, setOpen] = useState([]);
    const [filter, setFilter] = useState({
        search: null,
        subject: getFilter('subject'),
        teacher: getFilter('teacher'),
        friends: getFilter('friends'),
        lops: getFilter('lops')
    });
    const [course, setCourse] = useState(null);
    const [current, setCurrent] = useState(null);
    const [mode, setMode] = useState('SELECT');

    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const tray = useSelector(useTray);

    const initialize = () => {
        dispatch(getTrayList({auth: auth.token}))
        dispatch(updateSelections({auth: auth.token}))
        dispatch(getFriendSelections({auth: auth.token}))
    }

    const closePeriod = (hash) => setOpen(open.filter(h => h != hash))

    const loadPeriod = (hash) => {
        if(open.includes(hash)) return closePeriod(hash);

        dispatch(getPeriod({auth: auth.token, hash: hash}));

        // load the calculated period
        if(Object.keys(periods).includes(hash)) dispatch(getWeek({auth: auth.token, date: periods[hash]}));
        setOpen([...open, hash]);
        setCurrent({period: hash});
    }

    const loadCourse = (hash) => {
        dispatch(getTrayCourse({auth: auth.token, hash: hash}))
        setCourse(hash);
    }

    const applyFilter = (f) => {
        if (f.type === 'search') return setFilter({...filter, search: f.value});
        if(f.reset) {
            setFilter({...filter, [f.type]: []})
            saveFilter(f.type, []);
            return;
        }

        if(filter[f.type].filter(n => f.value.includes(n)).length > 0 && !f.all) {
            setFilter({...filter, [f.type]: filter[f.type].filter(n => !f.value.includes(n))})
            saveFilter(f.type, filter[f.type].filter(n => !f.value.includes(n)))
            return;
        }
        
        setFilter({...filter, [f.type]: [...filter[f.type], ...f.value]})
        saveFilter(f.type, [...filter[f.type], ...f.value]);
    }

    const switchMode = (selected) => {
        if(selected === mode) {
            return;
        }

        if(tray.planned.isLoading) {
            dispatch(getOwnPlan({auth: auth.token}));
            dispatch(getFriendsPlans({auth: auth.token}));
        }

        setMode(selected);
    }

    const appendPlan = (code) => {
        console.log(code);
        if(tray.planned.own.includes(code)) {
            dispatch(deplanCourse({auth: auth.token, code: code}))
        } else {
            dispatch(planCourse({auth: auth.token, code: code}))
        }
    }

    useEffect(initialize, []);

    return (
        <>
            <ModeDisclaimer mode={mode}/>
            {tray.error ? <ErrorWindow /> : null}
            <BlurLayer className={styles['content']} isLoading={tray.isSelecting || tray.error}>
                <div className={styles['tray-list']}>
                    <TrayList open={open} onLoad={loadPeriod}/>
                </div>
                <div className={styles['tray-main']}>
                    <PeriodContainer open={open} filter={filter} mode={mode} onLoad={loadCourse} onClose={closePeriod} onHover={e => setCurrent(e)} onPlan={e => appendPlan(e)}/>
                </div>
                <div className={styles['tray-info']}>
                    <TrayInfoContainer open={open} course={course} filter={filter} setFilter={applyFilter} current={current} mode={mode} onSwitch={switchMode}/>
                </div>
            </BlurLayer>
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

const ListTrayObject = ({open, name, periods, onLoad, onHover}) => {
    return (
        <div className={styles['tray']}>
            <h1>{name}</h1>
            <div className={styles['period-list']}>
                {
                    periods.map((period, i) => {
                        return <ListPeriodObject open={open} key={i} period={period} onLoad={onLoad} onHover={onHover}/>
                    })
                }
            </div>
        </div>
    )
}

const ListPeriodObject = ({open, period, onLoad}) => {
    return (
        <div
            className={`${styles['tray-object']} ${open.includes(period.hash) ? styles['selected'] : null}`}
            onClick={() => onLoad(period.hash)}
        >
            <h2>{period.name}</h2>
            {
                open.includes(period.hash) ? 
                <h6 className={period.closed ? styles['closed'] : null}>{period.closed ? 'Suljettu' : 'Avoin'}</h6>
                :
                null
            }
            <h3>{period.status}</h3>
        </div>
    )
}

const PeriodContainer = ({open, filter, mode, onLoad, onClose, onHover, onPlan}) => {
    const tray = useSelector(useTray);
    const periods = tray.periods;

    if(open.length == 0) return  <PlaceHolder className={styles['tray-placeholder']} />

    return (
        <>
            {
                open.map((hash, i) => {
                    const period = periods[hash];
                    return <TrayPeriodObject key={i} hash={hash} period={period} filter={filter} mode={mode} onLoad={onLoad} onClose={onClose} onHover={onHover} onPlan={onPlan}/>
                })
            }
        </>
    )
}

const ModeDisclaimer = ({mode}) => {
    if(mode == 'SELECT') return <></>

    return (
        <div className={styles['mode-disclaimer']}>
            <h6>
                <strong>Suunnittelutila</strong> - muutoksia ei tallenneta
            </h6>
        </div>
    )
}

const TrayPeriodObject = ({hash, period, filter, mode, onLoad, onClose, onHover, onPlan}) => {
    const [hidden, setHidden] = useState(false);

    if(period.isLoading) return <div className={styles['period']}>
        <h1>...</h1>
    </div>

    return (
        <div onMouseEnter={() => onHover({period: hash})} style={{order: period.index}} className={`${styles['period']} ${hidden ? styles['closed'] : styles['open']}`}>
            <h1>{period.name}</h1>
            <div className={styles['period-actions']}>
                <button onClick={() => setHidden(!hidden)} className={styles['hide-period']}>
                    <h6 className={hidden ? styles['open'] : styles['closed']}></h6>
                </button>
                <button onClick={() => onClose(hash)} className={styles['disable-period']}> </button>
            </div>
            <>
                {
                    period.bars.map((bar, i) => {
                        return <TrayBarObject key={i} bar={bar} filter={filter} mode={mode} onLoad={onLoad} onHover={onHover} onPlan={onPlan} />
                    })
                }
            </>
        </div>
    )
}

const TrayBarObject = ({bar, filter, mode, onLoad, onPlan}) => {
    const tray = useSelector(useTray);
    const editMode = mode == 'PLAN';
    const courses = tray.courses;
    const friends = editMode ? tray.planned.friends : tray.friends;

    return (
        <div className={styles['bar']}>
            <h2>{bar.name}</h2>
            <div className={styles['course-list']}>
                {
                    bar.courses.map((hash, i) => {
                        const course = {...courses[hash], class: editMode ? courses[hash].class.replaceAll('on', 'off') : courses[hash].class};
                        const list = friends[course.code];
                        const planned = tray.planned.own.includes(course.code);
                        
                        return <TrayCourseObject key={i} friends={list ? list : []} mode={mode} planned={planned} course={course} filter={filter} onLoad={onLoad} onPlan={onPlan} />
                    })
                }
            </div>
        </div>
    )
}

const TrayCourseObject = ({friends, course, filter, mode, planned, onLoad, onPlan}) => {

    if((filter.subject.length > 0 || filter.lops.length > 0 || filter.search) && !(!course.info.grade)) return <></>

    if(filter.search) if(!course.name.toLowerCase().includes(filter.search) && !course.code.toLowerCase().includes(filter.search)) return <></>
    if(filter.subject.length > 0) if(filter.subject.filter(r => course.code.includes(r)).length == 0) return <></>
    if(filter.teacher.length > 0) if(filter.teacher.filter(r => !(!course.info.teacher) && course.info.teacher.includes(r)).length == 0) return <></>
    if(filter.lops.length > 0) if(filter.lops.filter(r => course.lops == r).length == 0) return <></>

    const friend = friends.length > 0 ? [...friends].sort()[0] : null;
    const color = friends.length > 0 ? randomColor(friend) : null;
    const hasFriends = friends.length > 0 && (filter.friends.length > 0 ? (friends.filter(f => filter.friends.includes(f)).length > 0) : true);

    const className = planned && mode == 'PLAN' ? course.class.replaceAll('off', 'on') : course.class;
    
    return (
        <div 
            className={className.split(' ').map(c => styles[c]).join(' ')}
            onClick={() => {if(mode == 'SELECT') {onLoad(course.hash)} else {onPlan(course.code)}}}
            style={{
                borderLeft: color && hasFriends ? `solid 3px var(${color})` : null,
            }}
        >
            {course.code}
            <div className={styles['friend-list']}>
                {
                    hasFriends ? 
                    <>
                        <h6 style={{backgroundColor: `var(${randomColor(friend)})`}} >{`${shorten(friend)}`}</h6>
                    </> : <></>
                }
            </div>
            
            <div className={styles['course-data']}>
                <h2>{course.name}</h2>
                <h2>{course.info.teacher}</h2>
                {course.info.locked ? <h2>Kurssi on lukittu</h2> : null}
                {course.info.full ? <h2>Kurssi on jo täynnä</h2> : null}
                {friends.length > 0 ? <h2>Kavereita kurssilla:</h2> : null}
                {
                    friends.map((name, i) => {
                        return <h3 key={i}>{username(name)}</h3>
                    })
                }
            </div>
        </div>
    )
}

const TrayInfoContainer = ({open, course, current, filter, setFilter, mode, onSwitch}) => {
    const editMode = mode == 'SELECT';
    return (
        <div>
            <div className={styles['edit-mode']}>
                <h5 onClick={() => onSwitch('SELECT')} className={mode == 'SELECT' ? styles['selected'] : null} >Valintatila</h5>
                <h5 onClick={() => onSwitch('PLAN')} className={mode == 'PLAN' ? styles['selected'] : null} >Suunnittelutila</h5>
            </div>
            {editMode ? <TraySchedule current={current}/> : null}
            <h1>Toiminnot</h1>
            {open.length > 0 ? <SearchBarObject setFilter={setFilter} /> : <></>}
            {open.length > 0 ? <FilterObject filter={filter} setFilter={setFilter}/> : <></>}
            {editMode ? 
            <>
                <h1>Tietoa kurssista</h1>
                {open.length > 0 ? <CourseInfoObject course={course}/> : <></>}
            </>
            :
            <>
                <h3 className={styles['mode-explanation']}>"<strong>Pikavalinta on käytössä</strong>. Suunnittele kurssivalintojasi valitsemalla vapaasti kursseja ennen kurssitarjottimen julkaisua. <strong>Ystävät joille olet jakanut kurssivalintasi näkevät myös suunnitelmasi.</strong>"</h3>
            </>
            }
        </div>
    )
}

const TraySchedule = ({current}) => {
    const schedule = useSelector(useSchedule);
    if(!current) return <div className={styles['schedule']}></div>
    if(!Object.keys(periods).includes(current.period)) return <div className={`${styles['schedule']} ${styles['error']}`}><h6>Tarjottimelle ei ole saatavilla lukujärjestystä</h6></div>

    const date = periods[current.period].toLocaleDateString('fi-FI');
    const week = schedule.schedule[date];

    if(!week) return <div className={styles['schedule-loading-screen']} />

    return (
        <div style={{height: week.height / 3}} className={styles['schedule']}>
            {
                Object.keys(week.days).filter(date => !['La', 'Su'].includes(week.days[date].day.caption.split(' ')[0])).map((date, i) => {
                    const day = week.days[date];
                    return <TrayDayObject key={i} day={day} />
                })
            }
        </div>
    )
}

const TrayDayObject = ({day}) => {
    const lessons = day.lessons;
    
    return (
        <div className={styles['day']}>
            {
                lessons.map((lesson, i) => {                    
                    const start = lessons[i]['startRaw'];
                    const duration = lessons[i]['durationRaw'];
                    
                    return <LessonObject key={i} start={start - 510} height={duration} lesson={lesson} />
                })
            }
    </div>
    )
}

const LessonObject = ({start, height, lesson}) => {
    return (
        <div
            className={styles['hour']}
            style={{
                height: `${height / 3}px`,
                marginTop: `${(start) / 3}px`,
            }}>
            {
                lesson.groups.map((group, i) => {
                    return (
                        <div key={i} className={styles['data']}>
                            <GroupObject group={group} />
                        </div>
                    )
                })
            }
        </div>
    )
}

const GroupObject = ({group}) => {
    return (
        <div className={styles['group']}>
            <h2 className={styles['code']}>{group.code}</h2>
        </div>

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
        friends: [],
        lops: [
            'LOPS2021 Nykyinen lukion opetussuunnitelma [2021]',
            'LOPS2016 Vanha lukion opetussuunnitelma [2016]',
        ]
    }

    filters.subject = Object.keys(courses).reduce((list, hash) => {
        const course = courses[hash];
        let subject = (course.subject.endsWith('D') ? course.subject.substring(0, course.length - 1) : course.subject).replaceAll('w', '');
        if(subject == 'S') subject = 'S2';

        if(!list.includes(subject) && Object.keys(subjects).includes(subject)) return [...list, subject]

        return list
    }, []).sort()

    filters.teacher = Object.keys(courses).reduce((list, hash) => {
        const course = courses[hash];
        const teacher = course.info.teacher ? course.info.teacher : '';

        if(teacher != '' && !list.includes(teacher) && !teacher.includes('/')) return [...list, teacher]
        
        return list
    }, []).sort()

    filters.friends = Object.keys(tray.friends).reduce((list, subject) => {
        const friends = tray.friends[subject];
        
        return [...list, ...friends.filter(friend => !list.includes(friend))];
    }, []).sort()

    return (
        <div className={styles['filter-container']}>
            <h1>Suodata kursseja</h1>
            <div className={styles['filters']}>
                <h4 onClick={() => setCurrent('subject')} className={current == 'subject' ? styles['selected-filter'] : null}>Oppiaine</h4>
                <h4 onClick={() => setCurrent('teacher')} className={current == 'teacher' ? styles['selected-filter'] : null}>Opettaja</h4>
                <h4 onClick={() => setCurrent('friends')} className={current == 'friends' ? styles['selected-filter'] : null}>Kaverit</h4>
                <h4 onClick={() => setCurrent('lops')} className={current == 'lops' ? styles['selected-filter'] : null}>LOPS</h4>
            </div>
            <div className={styles['filter-list']}>
                <div className={styles['filter-info']}>
                    <h2 onClick={() => {setFilter({type: current, value: current == 'teacher' || current == 'lops' ? filters[current].map(n => n.split(' ')[0]) : filters[current], all: true})}}>Valitse kaikki</h2>
                    <h2 onClick={() => {setFilter({type: current, value: ['reset'], reset: true})}}>Poista valinnat</h2>
                </div>
                {
                    filters[current].map((subject, i) => {
                        const s = subject.split(' ');

                        const key = s.shift();
                        const value = s.join(' ');

                        switch(current) {
                            case 'friends':
                                const color = randomColor(key);
                                return (
                                    <ul key={key}>
                                        <input type='checkbox' checked={filter[current].includes(key)} onChange={() => {setFilter({type: current, value: [key]})}}/>
                                        <a className={styles['friend-icon']} style={{backgroundColor: `var(${color})`}}>{shorten(key)}</a>
                                        <a style={{color: `var(${color})`}}>{username(key)}</a>
                                    </ul>
                                )
                            default:
                                return (
                                    <ul key={key}>
                                        <input type='checkbox' checked={filter[current].includes(key)} onChange={() => {setFilter({type: current, value: [key]})}}/>
                                        <a>{`${key} - `}</a>
                                        <a>{Object.keys(subjects).includes(key) ? subjects[key] : value}</a>
                                    </ul>
                                )
                        }

                    })
                }
            </div>
        </div>
    )
}

const CourseInfoObject = ({course: hash}) => {
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const tray = useSelector(useTray);
    const courses = tray.courses;
    const periods = tray.periods;

    if(!courses[hash]) return <></>
    if(courses[hash].isLoading) return <LoadingScreen className={styles['tray-info-loading-screen']} />
    const course = courses[hash];
    const overlapping = periods[course.period].bars[course.bar].courses.map(hash => courses[hash]).filter(c => c.isSelected).map(c => c.code);
    

    const select = (hash) => {
        dispatch(selectCourse({auth: auth.token, hash: hash}))
    }

    const deselect = (hash) => {
        dispatch(deselectCourse({auth: auth.token, hash: hash}))
    }

    const disabled = (course['info'].full || course['info'].locked) ? true : false;
    const statusText = 
        course.isSelected ? 'Poista valinta' :
        disabled ? (course['info'].full ? 'Kurssi on täynnä' : 'Kurssi on lukittu') :
        (overlapping.length > 0) ? `Päällekkäisyyksiä: ${overlapping.join(', ')}` :
        'Valitse kurssi'

    return (
        <div className={styles['course-info']}>
            <h1>{course.name}</h1>
            <h3>{course.code}</h3>
            <button disabled={disabled || (!course.isSelected && overlapping.length > 0)} onClick={() => {if(course.isSelected) {deselect(course.hash)} else {select(course.hash)}}} className={styles['course-action']}>
                {statusText}
            </button>
            {
                ['Ilmoittautuneita', 'Maksimikoko', 'Opettaja', ...Object.keys(course).filter(k => !['Ilmoittautuneita', 'Maksimikoko', 'Opettaja'].includes(k))].filter(k => !['lops', 'period', 'bar', 'name', 'code', 'hash', 'isLoading', 'class', 'info', 'isSelected', 'subject'].includes(k)).map((key, i) => {
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

const ErrorWindow = () => {
    const tray = useSelector(useTray);
    const dispatch = useDispatch();
    return (
        <div className={styles['error-window']}>
            <div className={styles['background']} />
            <h1>Kurssivalinnan muuttaminen epäonnistui</h1>
            <h2>{tray.error}</h2>
            <h4 onClick={() => dispatch(resetError())}>sulje</h4>
        </div>
    )
}

const saveFilter = (type, value) => {
    window.localStorage.setItem(type, JSON.stringify(value));
}

const getFilter = (type) => {
    const v = window.localStorage.getItem(type);

    if(!v) {
        window.localStorage.setItem(type, JSON.stringify([]));
        return []
    }

    try { return JSON.parse(v) ?? [] } catch(e) { return [] }
}

const randomColor = (raw) => {
    const u = shorten(raw)
    const [f, l] = (new TextEncoder()).encode(u);
    let seed = Math.abs(f + l);
    const x = Math.sin(seed++) * 10000;
    const rnd = x - Math.floor(x);

    return [
        '--L2021-mandatory-main',
        '--L2021-mandatory-selected',
        '--L2021-g-optional-selected',
        '--L2021-l-optional-main',
        '--L2021-l-optional-selected',
        '--L2021-diploma-selected',
        '--L2016-l-optional-main',
        '--L2016-g-optional-main',
    ][Math.floor(rnd * 8)];
}

const shorten = (raw) => {
    return username(raw).split(' ').map(s => s[0]).join('');
}
const username = (raw) => {
    return raw.split('.').length > 1 ? [raw.split('.')[0], raw.split('.')[raw.split('.').length - 1]].map(u => `${u.charAt(0).toUpperCase()}${u.slice(1)}`).join(' ') : raw;
}

