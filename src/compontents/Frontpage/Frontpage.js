import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../features/authentication/authSlice';
import { useMessages, getMessages } from '../../features/messages/messageSlice';
import { useGrades, getGradebook } from '../../features/grades/gradeSlice';
import { useNews, getNews } from '../../features/news/newsSlice';
import { useSchedule, getWeek } from '../../features/schedule/scheduleSlice';
import { useHomework, getGroups } from '../../features/schedule/homeworkSlice';

import styles from './Frontpage.module.css';
import { Link } from 'react-router-dom';

import { LoadingScreen, PlaceHolder } from '../LoadingScreen/LoadingScreen';
import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';


export default function Frontpage() {
    const [category, setCategory] = useState('schedule');
    
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

    // componentDidMount
    useEffect(() => { initialize() }, []);

    return (
        <div className={styles['content']}>
            <div className={styles['top-container']}>
                <div className={styles['left']}>
                    <div className={styles['side-bar']}>
                        <div className={styles['side-bar-content']}>
                            <h5 onClick={() => loadSchedule()} className={category == 'schedule' ? styles['selected'] : null}>Työjärjestys</h5>
                            <h5 onClick={() => loadHomework()}  className={category == 'homework' ? styles['selected'] : null}>Kotitehtävät</h5>
                        </div>
                    </div>  
                    <div className={styles['schedule']}>
                        {category == 'schedule' ? <Schedule days={days}/> : <HomeworkContainer />}
                    </div>
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
                            <a target="_blank" href="https://www.sanomapro.fi/">Sanomapro - digikirjat</a>
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
        </div>
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
                    const d = Object.keys(schedule.schedule).find(week => schedule.schedule[week].range.includes(date));
            
                    if (schedule.schedule.isLoading || !schedule.loaded.includes(d)) return <LoadingScreen key={i} className={styles['loading-screen']} />;
                
                    const week = schedule['schedule'][d];
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
                <h2>{group.caption}</h2>
                <h4>{group.name}</h4>
                <h3>{group.teachers.length > 0 ? group.teachers[0].name : null}</h3>
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
            <Link to={'/'}>Tiedotteet</Link>
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
            <Link to={'/'}>Viestit</Link>
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
    if (grades.isLoading) return <LoadingScreen className={styles['loading-screen']} />;

    return (
        <>
            <Link className={styles['title']} to={'/grades'}>Opinnot</Link>
            <OverviewObject overview={grades['overview']} />
            {
                Object.keys(grades['subjects']).map((subject, i) => {
                    const grade = grades['subjects'][subject];

                    return <GradeObject key={i} subject={subject} grade={grade} />
                })
            }
        </>
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
