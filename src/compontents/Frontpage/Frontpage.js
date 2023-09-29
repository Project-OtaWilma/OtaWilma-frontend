import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../features/authentication/authSlice';
import { useMessages, getMessages } from '../../features/messages/messageSlice';
import { useGrades, getGradebook, getYOResults } from '../../features/grades/gradeSlice';
import { useNews, getNews } from '../../features/news/newsSlice';
import { useSchedule, getWeek, getMonth } from '../../features/schedule/scheduleSlice';
import { useHomework, getGroups } from '../../features/schedule/homeworkSlice';

import styles from './Frontpage.module.css';
import { Link } from 'react-router-dom';

import { BlurLayer, LoadingScreen, PlaceHolder } from '../LoadingScreen/LoadingScreen';
import { useRef } from 'react';

import Welcome from './Welcome';

import { useNavigate } from 'react-router-dom';

const weekdays = [
    'Maanantai',
    'Tiistai',
    'Keskiviikko',
    'Torstai',
    'Perjantai',
    'Lauantai',
    'Sunnuntai'
]

const months = [
    'Tammikuu',
    'Helmikuu',
    'Maaliskuu',
    'Huhtikuu',
    'Toukokuu',
    'Kesäkuu',
    'Heinäkuu',
    'Elokuu',
    'Syyskuu',
    'Lokakuu',
    'Marraskuu',
    'Joulukuu'
]


export default function Frontpage() {
    const [category, setCategory] = useState('schedule');
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const [current, setCurrentDate] = useState(new Date());
    
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);

    const now = new Date();
    
    const days = [
        new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
        new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14)
    ]
    
    const initialize = () => {
        dispatch(getMessages({auth: auth.token, path: 'inbox'}))
        dispatch(getNews({auth: auth.token, path: 'current'}))
        dispatch(getGradebook({auth: auth.token}))
        dispatch(getYOResults({auth: auth.token}))
        dispatch(getMonth({auth: auth.token}))

        loadSchedule();
    }

    const loadSchedule = () => {
        setCategory('schedule');
        days.forEach(date => {
            dispatch(getWeek({auth: auth.token, date: date}))
        })
    }

    const loadHomework = () => {
        setCategory('homework');
        dispatch(getGroups({auth: auth.token}));
    }

    const loadCalendar = (direction) => {
        const d = new Date(current.getFullYear(), current.getMonth() + direction, current.getDate());
        dispatch(getMonth({auth: auth.token, date: d}))
        setCurrentDate(d);
    }

    // componentDidMount
    useEffect(() => { initialize() }, []);

    return (
        <>
            {open ? <ScheduleWindow current={current} loadCalendar={loadCalendar} onClose={() => setOpen(false)} /> : null}
            <BlurLayer className={styles['content']} isLoading={open}>
                <div className={styles['top-container']}>
                    <div className={styles['left']}>
                        <div className={styles['side-bar']}>
                            <div className={styles['side-bar-content']}>
                                <h5 onClick={() => loadSchedule()} className={category == 'schedule' ? styles['selected'] : null}>Työjärjestys</h5>
                                <h5 onClick={() => loadHomework()}  className={category == 'homework' ? styles['selected'] : null}>Kotitehtävät</h5>
                            </div>
                        </div>  
                        <div className={styles['schedule']} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onDoubleClick={() => setOpen(true)}>
                            {category == 'schedule' ? <Schedule days={days}/> : <HomeworkContainer />}
                        </div>
                        <h1 style={{opacity: hover ? 0.75 : 0}} className={styles['schedule-info']}>Avaa kalenteri painamalla kahdesti</h1>
                    </div>
                    <div className={styles['middle']}>
                        <Clock />
                </div>
                    <div className={styles['right']}>
                        <div className={styles['news']}>
                            <NewsList />
                        </div>
                    </div>
                </div>
                <div className={styles['bottom-container']}>
                    <div className={styles['left']}>
                        <div className={styles['grades']}>
                            <YoResultsObject />
                            <GradeList />
                        </div>
                    </div>
                    <div className={styles['middle']}>
                        <div className={styles["links"]}>
                            <h1>Linkit</h1>
                            <h3>Opiskelu</h3>

                            <div className={styles["link"]}>
                                <a target="_blank" href="https://classroom.google.com/">Google Classroom</a>
                            </div>
                            <div className={styles["link"]}>
                                <a target="_blank" href="https://www.microsoft.com/fi-fi/microsoft-teams/log-in">Microsoft
                                    Teams</a>
                            </div>

                            <div className={styles["link"]}>
                                <a target="_blank" href="https://espoo.inschool.fi/">Wilma - espoo</a>
                            </div>
                            <div className={styles["link"]}>
                                <a target="_blank" href="https://digikirja.otava.fi/tietokantajulkaisut/maol-2020/">MAOL
                                    digitaulukot</a>
                            </div>
                            <div className={styles["link"]}>
                                <a target="_blank" href="https://kampus.sanomapro.fi/">Sanomapro - digikirjat</a>
                            </div>
                            <div className={styles["link"]}>
                                <a target="_blank" href="https://opiskelija.otava.fi/materiaalit/omat">Otava -
                                    digikirjat</a>
                            </div>
                            <div className={styles["link"]}>
                                <a target="_blank" href="https://app.studeo.fi/auth/login">Studeo -
                                    digikirjat</a>
                            </div>
                            <div className={styles["link"]}>
                                <a target="_blank" href="https://shop.edita.fi/digiedita/omat-tuotteet">Edita -
                                    digikirjat</a>
                            </div>
                            <h3>Hyödyllinen</h3>
                            <div className={styles["link"]}>
                                <a target="_blank" href="https://lomalaskuri.tk/OtaniemenLukio/Etusivu">Lomalaskuri</a>
                            </div>
                            <div className={styles["link"]}>
                                <a target="_blank"
                                    href="https://www.espoo.fi/fi/otaniemen-lukio/kalenteri-otaniemen-lukio">Otaniemen lukio
                                    - Kalenteri</a>
                            </div>
                            <div className={styles["link"]}>
                                <a target="_blank"
                                    href="https://www.espoo.fi/fi/otaniemen-lukio/opiskelijalle-otaniemen-lukio#section-33736">Otaniemen
                                    Lukio - opiskelijalle</a>
                            </div>
                            <h3>Ruokailu</h3>
                            <div className={styles["link"]}>
                                <a target="_blank"
                                    href="https://www.amica.fi/ravintolat/ravintolat-kaupungeittain/espoo/tietokyla/">Amica
                                    -
                                    Otaniemen lukio</a>
                            </div>
                            <div className={styles["link"]}>
                                <a target="_blank" href="https://www.lounaat.info/otaniemi">Lounaat - Otaniemi</a>
                            </div>
                            <div className={styles["link"]}>
                                <a target="_blank" href="https://kanttiinit.fi/">Lounaat - Kanttiinit</a>
                            </div>
                            <h3>Ruokailuvuorot</h3>
                            <div className={styles["link"]}>
                                <a target="_blank"
                                    href="https://drive.google.com/file/d/1NrGciABX7vW9lq7q4mA7xfoNEmPrRr_z/view">Ruokailuvuorot
                                    - 1. periodi</a>
                            </div>
                            <div className={styles["link"]}>
                                <a target="_blank"
                                    href="https://drive.google.com/file/d/1ql4Ko64915NAWrsDyyDqXynhrX1z3Duw/view?usp=sharing">Ruokailuvuorot
                                    - 2. periodi</a>
                            </div>
                            <div className={styles["link"]}>
                                <a target="_blank"
                                    href="https://drive.google.com/file/d/1jCpX8_HOmXCvfGjJ3t_VC4cjIXNsPbwd/view?usp=sharing">Ruokailuvuorot
                                    - 3. periodi</a>
                            </div>
                        </div>
                    </div>
                    <div className={styles['right']}>
                        <div className={styles['messages']}>
                            <MessageList />
                        </div>
                    </div> 
                </div>
            </BlurLayer>
        </>
    )
}

const Clock = () => {
    const date = (new Date());
    const [sec, setSec] = useState(`${((date.getSeconds() / 60) * 360) + 180}deg`);
    const [min, setMin] = useState(`${((date.getMinutes() / 60) * 360) + ((date.getSeconds() / 60) * 6) + 180}deg`);
    const [hour, setHour] = useState(`${((date.getHours() / 12) * 360) + ((date.getMinutes() / 60) * 30) + 180}deg`);
    const [time, setTime] = useState(date.toLocaleTimeString());

    const update = () => {
        const date = (new Date());
        setSec(`${((date.getSeconds() / 60) * 360) + 180}deg`);
        setMin(`${((date.getMinutes() / 60) * 360) + ((date.getSeconds() / 60) * 6) + 180}deg`);
        setHour(`${((date.getHours() / 12) * 360) + ((date.getMinutes() / 60) * 30) + 180}deg`);
        setTime(date.toLocaleTimeString())
    }

    useEffect(() => {
        const clock = setInterval(() => {
            update()
        }, 1000);
    
        return () => clearInterval(clock);
    }, []);

    return (
        <>
            <div className={styles["clock"]}>
                <div className={styles["clock-marking-x"]}></div>
                <div className={styles["clock-marking-y"]}></div>
                <div className={`${styles["clock-marking"]} ${styles["one"]}`}></div>
                <div className={`${styles["clock-marking"]} ${styles["two"]}`}></div>
                <div className={`${styles["clock-marking"]} ${styles["three"]}`}></div>
                <div className={`${styles["clock-marking"]} ${styles["four"]}`}></div>
                <div className={styles["inner-circle"]}>
                    <div className={`${styles["hand"]} ${styles["sec"]}`} style={{rotate: sec}}></div>
                    <div className={`${styles["hand"]} ${styles["min"]}`} style={{rotate: min}}></div>
                    <div className={`${styles["hand"]} ${styles["hour"]}`} style={{rotate: hour}}></div>
                    <div className={styles["center"]}></div>
                </div>
            </div>
            <div className={styles['info']}>
                <h1>{time}</h1>
                <h2>{(new Date).toLocaleDateString('fi-Fi', {weekday: 'short', year: "numeric", month: "long", day: "numeric"})}</h2>
            </div>
        </>
    )
}

const Schedule = ({days}) => {
    const schedule = useSelector(useSchedule);
    const map = days.map(date => date.toLocaleString('Fi-fi', {day: '2-digit', month: '2-digit', year: 'numeric'}))
    
    return (
        <>
            {
                map.map((date, i) => {
                    const d = Object.keys(schedule.weeks).find(week => schedule.weeks[week].range.includes(date));
            
                    if (schedule.weeks.isLoading || !schedule.loaded.includes(d)) return <LoadingScreen key={i} className={styles['loading-screen']} />;
                
                    const week = schedule['weeks'][d];
                    return <WeekObject key={i} week={week} />
                })
            }
        </>
    )
}

const WeekObject = ({week}) => {
    return (
        <div className={styles['week']} style={{minHeight: Math.max(50, week.height * 0.85)}}>
            <div className={styles['week-caption']}>
                <h1>{`Viikko ${week.week}`}</h1>
            </div>
            <div className={styles['days']}>
                {
                    Object.keys(week.days).filter(date => !['La', 'Su'].includes(week.days[date].day.caption.split(' ')[0])).map((date, i) => {
                        const day = week.days[date];
                        return <DayObject key={i} day={day} />
                    })
                }
            </div>
        </div>
    )
}

const DayObject = ({day}) => {
    const ref = useRef(null);
    const lessons = day.lessons;

    return (
        <div className={styles['day']} ref={ref}>
            <div className={styles['date']}>
                <h1>{day.day.caption}</h1>
            </div>
                {
                    lessons.map((lesson, i) => {
                        const start = lessons[i]['startRaw'];
                        const duration = lessons[i]['durationRaw'];
                        const eRaw = new Date(lessons[i]['endTime']);
                        const sRaw = new Date(lessons[i]['startTime']);
                        
                        const date = new Date();
                        const active = date.getTime() <= eRaw.getTime() && date.getTime() >= sRaw.getTime();
                        const passed = date.getTime() >= eRaw.getTime();

                        return <LessonObject key={i} start={start - 480} height={duration} lesson={lesson} active={active} passed={passed} />
                    })
                }
        </div>
    )
}

const LessonObject = ({start, height, lesson, active, passed}) => {
    return (
        <div
            className={styles['hour']}
            style={{
                height: `${height * 0.85}px`,
                marginTop: `${(start) * 0.85}px`,
                filter: `brightness(${((Math.random() * 1.4) - 1) * 8 + 100}%)`,
                opacity: passed ? 0.5 : 1
            }}>
            <h1>{`${lesson['start']} - ${lesson['end']}`}</h1>
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

const HomeworkContainer = ({}) => {
    const homework = useSelector(useHomework);
    const groups = homework.groups;

    if(homework.isLoading) return <LoadingScreen className={styles['homework-loading-screen']} />

    return (
        <div className={styles['homework']}>
            <h1>Kurssit tässä jaksossa</h1>
            <div className={styles['course-list']}>
                {
                    groups.map((group, i) => {
                        return <HomeworkGroupObject key={i} group={group} />
                    })
                }
            </div>
        </div>
    )
}

const HomeworkGroupObject = ({group}) => {
    const [hidden, setHidden] = useState(true);
    return (
        <div className={styles['group-object']}>
            <div className={`${styles['group-code']} ${styles[group.type]}`}>
                {group.caption ? <h2>{group.caption}</h2> : null}
                {group.name ? <h4>{group.name}</h4> : null}
                <h3>{group.teachers && group.teachers.length > 0 ? group.teachers[0].name : null}</h3>
            </div>
            <div className={styles['homework-list']}>
                <h5>Kotitehtävät</h5>
                {
                    (hidden ? (group.homework.length > 0 ? [group.homework[0]] : [null]) : group.homework).map((homework, i) => {
                        if(!homework) return <h3 key={i}>Ei kotitehtäviä</h3>
                        return <HomeworkObject key={i} homework={homework} />
                    })
                }
            </div>
            
            {group.homework.length > 1 ? <h2 onClick={() => setHidden(!hidden)} className={styles['homework-action']}>{hidden ? 'Näytä kaikki' : 'Sulje'}</h2> : null}
        </div>
    )
}

const HomeworkObject = ({homework}) => {
    return (
        <div className={styles['homework-object']}>
            <h2>{homework.date}</h2>
            <h3>{homework.assignment}</h3>
        </div>
    )
}

const GroupObject = ({group}) => {
    return (
        <div className={styles['group']}>
            {group.teachers ? group.teachers.map((teacher, i) => <Link key={i} to={`/teachers/${teacher.id}`}>{teacher.caption}</Link>) : null}
            <h2 className={styles['code']}>{group.code}</h2>
            {group.rooms ? group.rooms.map((room, i) => <Link key={i} to={`/maps/${room.caption}`}>{room.caption}</Link>) : null}
        </div>

    )
}

const NewsList = () => {
    const news = useSelector(useNews);
    const list = news.list['current'];
    const map = news.news;
    if (list.isLoading) return <LoadingScreen className={styles['loading-screen']} />;

    return (
        <>
            <Link to={'/news'}>Tiedotteet</Link>
            {
                list['content'].map((id, i) => {
                    return <NewsObject key={i} news={map[id]}/>
                })
            }
        </>
    )
}

const NewsObject = ({news: n}) => {
    const navigate = useNavigate();

    return (
        <>
            <div 
                onClick={() => navigate(`/news/${n.id}`)}
                key={n.href} 
                className={n.isInvalid ? `${styles['news-object']} ${styles['disabled']}`: styles['news-object']}
            >
                <h1>{n.title}</h1>
                <h2>{n.date}</h2>
                <h2>{n.sender ? n.sender.name : <></>}</h2>
                <h3>{n.description}</h3>
                {n.isInvalid ? <h5>Tiedotteella ei ole tämän enempää sisältöä.</h5> : <></>} 
            </div>
        </>
    )
}

const MessageList = () => {
    const messages = useSelector(useMessages);
    const list = messages.list;
    const map = messages.messages;
    if (list['inbox'].isLoading) return <LoadingScreen className={styles['loading-screen']} />;

    return (
        <>
            <Link to={'/messages'}>Viestit</Link>
            {
                list['inbox']['content'].slice(0, 10).map((id, i) => {
                    return <MessageObject key={i} message={map[id]}/>
                })
            }
        </>
    )
}

const MessageObject = ({message}) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/messages/${message.id}`)}
            className={message.new ? `${styles['message-object']} ${styles['new']}` : `${styles['message-object']}`}
        >
                <h1>{message.subject}</h1>
                <h4>{message.timeStamp}</h4>
                {message.senders.map((s, i) => <h4 key={i}>{s.name}</h4>)}
                {message.new ? <h6>Uusi</h6> : null}
        </div>
    )
}

const GradeList = () => {
    const grades = useSelector(useGrades);
    if (grades.isLoading) return <div className={styles['grade-loading-screen']} />;
    if (grades.yoResults.length > 4) return null;

    return (
        <div className={styles['grade-container']}>
            <div className={styles['grade-data']}>
                <Link className={styles['title']} to={'/grades'}>Opinnot</Link>
                <OverviewObject overview={grades['overview']} />
                {
                    Object.keys(grades['subjects']).map((subject, i) => {
                        const grade = grades['subjects'][subject];

                        return <GradeObject key={i} subject={subject} grade={grade} />
                    })
                }
            </div>
        </div>
    )
}

const OverviewObject = ({overview}) => {
    return(
        <div className={styles['overview']}>
        {
            Object.keys(overview).map((key, i) => {
                const value = overview[key];

                return value ? <ul key={i}><a>{`${key}: `}</a><a>{value}</a></ul> : null;
            })
        }
        </div>
    )
}

const GradeObject = ({subject, grade}) => {
    return (
        <div className={styles['grade-object']}>
            <h1>{subject}</h1>
            <ul><a>Arvosana </a><a>{grade.grade}</a></ul>
            <ul><a>Laajuus </a><a>{grade.points}</a></ul>
        </div>
    )
}

const YoResultsObject = () => {
    const grades = useSelector(useGrades);
    if (grades.isLoading) return null;
    if (grades.yoResults.length <= 0) return null;

    return (
        <div className={styles['yo-container']}>
            <div className={styles['yo-data']}>
                <Link to={'/yo-results'} className={styles['table-title']}>Ylioppilaskirjoitukset</Link>
                <div className={`${styles['yo-column']} ${styles['head']}`}>
                    <div className={styles['yo-row']}>
                        <h2>YO-Oppiaine</h2>
                    </div>
                    <div className={styles['yo-row']}>
                        <h2>Ajankohta</h2>
                    </div>
                    <div className={styles['yo-row']}>
                        <h2>Alustavat</h2>
                    </div>
                    <div className={styles['yo-row']}>
                        <h2>Arvosana</h2>
                    </div>
                </div>
                {grades.yoResults.map((results, i) => {
                    return <YoResultsColumn key={i} result={results} />
                })}
            </div>
        </div>
    )
}

const YoResultsColumn = ({result}) => {
    const { subject, date, grade, points } = result;

    return (
        <div className={styles['yo-column']}>
            <div className={styles['yo-row']}>
                <h1>{subject.full}</h1>
            </div>
            <div className={styles['yo-row']}>
                <h2>{date}</h2>
            </div>
            <div className={styles['yo-row']}>
                <h2>{points ?? '---'}</h2>
            </div>
            <div className={styles['yo-row']}>
                <h2>{grade ?? '---'}</h2>
            </div>
        </div>
    )
}

const ScheduleWindow = ({current, loadCalendar, onClose}) => {
    return (
        <div className={styles['schedule-window']}>
            <button className={styles['schedule-left']} onClick={() => loadCalendar(-1)}>{"<"}</button>
            <button className={styles['schedule-right']} onClick={() => loadCalendar(1)}>{">"}</button>
            <div className={styles['current-info']}>
                <h2>{`${months[current.getMonth()]} ${current.getFullYear()}`}</h2>
            </div>
            <button className={styles['close']} onClick={onClose} >Sulje</button>
            <div className={styles['weekday-row']}>
                <div className={styles['weekday-list']}>
                    {
                        weekdays.map(weekday => {
                            return <h2 key={weekday}>{weekday}</h2>
                        })
                    }
                </div>
            </div>
            <Calendar current={current} loadCalendar={loadCalendar} onClose={onClose} />
        </div>
    )
}

const Calendar = ({current, loadCalendar, onClose}) => {
    const schedule = useSelector(useSchedule);
    const month = schedule.months[current.getMonth() + 1];

    if (!month) return <LoadingScreen className={styles['schedule-loading-screen']} />

    const range = calculateDaysInMonth(current.getMonth(), current.getFullYear());
    const weeks = range.reduce((a, b, i) => {
        const ch = Math.floor(i / 7); 
        a[ch] = [].concat((a[ch] || []), b);
        return a
    }, []);

    return (
        <div className={styles['rows']}>
                {
                    weeks.splice(0, 5).map((week, i) => {
                        return (
                            <div key={`week-${i}`} className={styles['schedule-row']}>
                                {
                                    week.map((day, i) => {
                                        const raw = day.toLocaleDateString('fi-FI', {'day': '2-digit', 'month': '2-digit', 'year': 'numeric'});
                                        const selected = month.range.includes(raw);

                                        return (
                                            <div
                                                key={`day-container-${i}`}
                                                className={styles['schedule-day']}
                                                style={{opacity: selected ? 1 : 0.4}}
                                            >
                                                <CalendarDayObject key={`day-${i}`} current={current} date={raw} dateTime={day} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
    )
}

const CalendarDayObject = ({current, date, dateTime}) => {
    const schedule = useSelector(useSchedule);
    const month = schedule.months[current.getMonth() + 1];
    if (!month) return <></>

    const day = month.days[date.split('.').reverse().join('-')];
    if (!day) return <><div className={styles['date']}><h1>{months[dateTime.getMonth()]}</h1></div><div className={styles['data']}></div></>
    return (
        <>
            <div className={styles['date']}>
                <h1 className={dateTime.getDay() == 6 || dateTime.getDay() == 0 ? styles['weekend'] : null}>{dateTime.getDate().toLocaleString(undefined, {minimumIntegerDigits: 2})}</h1>
            </div>
            <div className={styles['data']}>
                {
                    day.lessons.map((lesson, i) => {
                        return (
                            <CalendarLessonObject key={`lesson-${i}`} lesson={lesson} />
                        )
                    })
                }
                {
                    day.events.map((event, i) => {
                        return (
                            <CalendarEventObject key={`event-${i}`} event={event} />
                        )
                    })
                }
            </div>
        </>
    )
}

const CalendarEventObject = ({event}) => {
    const { fullDay } = event;

    const label = fullDay ? event.summary : `${event.start} - ${event.summary}`;

    return (
        <div className={fullDay ? `${styles['event']} ${styles['full']}` : styles['event']}>
            <h4>{label}</h4>
        </div>
    )
}

const CalendarLessonObject = ({lesson}) => {
    const { empty, durationRaw } = lesson;
    const height = durationRaw * 0.5;

    if (empty) return <div className={styles['lesson-empty']} style={{height: height}}></div>

    const group = lesson.groups[0];
    const teacher = (group.teachers[0] ?? {}).caption;

    return (
        <div
            className={styles['lesson']}
            style={{height: height}}
        >
            <div className={styles['group']}>
                <h2>{group.code}</h2>
                <h2 style={{fontFamily: 'bold'}}>{teacher ?? ''}</h2>
            </div>
        </div>
    )
}

// What the fuck is even this :D
const calculateDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    let d1 = date;
    let d2 = date;
    const days = [];

    while (d1.getMonth() === month) {
        days.push(new Date(d1));
        d1.setDate(d1.getDate() + 1);
    }

    d2 = new Date(d2.getFullYear(), d2.getMonth() - 1, d2.getDate());
    while (days[6].getDay() != 0) {
        d2.setDate(d2.getDate() - 1);
        days.unshift(new Date(d2));
    }

    while (days.length < 35) {
        days.push(new Date(d1));
        d1.setDate(d1.getDate() + 1);
    }

    return days;
}