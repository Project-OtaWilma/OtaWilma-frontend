import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../features/authentication/authSlice';
import { useMessages, getMessages } from '../../features/messages/messageSlice';
import { useGrades, getGradebook } from '../../features/grades/gradeSlice';
import { useNews, getNews } from '../../features/news/newsSlice';
import { useSchedule, getWeek } from '../../features/schedule/scheduleSlice';

import styles from './Frontpage.module.css';
import { Link } from 'react-router-dom';

import LoadingScreen from '../LoadingScreen/LoadingScreen';


export default function Frontpage() {
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const grades = useSelector(useGrades);
    const schedule = useSelector(useSchedule);

    const initialize = () => {
        console.log('ready!');
        dispatch(getMessages({auth: auth.token, path: 'inbox'}))
        dispatch(getNews({auth: auth.token, path: 'current'}))
        dispatch(getGradebook({auth: auth.token}))
        dispatch(getWeek({auth: auth.token, date: new Date('2022-10-24')}))
    }

    // componentDidMount
    useEffect(() => { initialize() }, []);

    return (
        <div className={styles['content']}>
            <div className={styles['top-container']}>
                <div className={styles['left']}>
                    <div className={styles['schedule']}>
                        <Schedule schedule={schedule}/>
                    </div>
                </div>
                <div className={styles['middle']}>
                    
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
                        <GradeList grades={grades} />
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
                                - 1A periodi</a>
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

const Schedule = ({schedule}) => {
    if (schedule.isLoading || !schedule.current) return <LoadingScreen className={styles['loading-screen']} />;

    const week = schedule['schedule'][schedule.current];
    return (
        <>
            {
                
                Object.keys(week.days).slice(0, 5).map((date, i) => {
                    const day = week.days[date];
                    return <DayObject key={i} date={date} day={day} />
                })
                
            }
        </>
    )
}

const DayObject = ({date, day}) => {
    return (
        <div className={styles['day']}>
            <div className={styles['date']}>
                <h1>{date}</h1>
            </div>
                {
                    day.lessons.map((lesson, i) => {
                        return <LessonObject key={i} lesson={lesson} />
                    })
                }
        </div>
    )
}

const LessonObject = ({lesson}) => {
    const start = (lesson['startRaw'] - 510) * 0.9;
    const end = (lesson['endRaw'] - 510) * 0.9;
    const height = end - start;
    return (
        <div
        className={styles['hour']}
        style={{
            height: `${height}px`,
            top: `${(start) + 30}px`,
            filter: `brightness(${((Math.random() * 2.7) - 1) * 8 + 100}%)`
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

const GroupObject = ({group}) => {
    return (

        <div className={styles['group']}>
            {group.teachers.map((teacher, i) => <Link key={i} to={'/'}>{teacher.caption}</Link>)}
            <h2 className={styles['code']}>{group.code}</h2>
            {group.rooms.map((room, i) => <h2 key={i}>{room.caption}</h2>)}
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
    
    return (
        <>
            <div key={n.href} className={n.isInvalid ? `${styles['news-object']} ${styles['disabled']}`: styles['news-object']}>
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
    return (
        <div className={message.new ? `${styles['message-object']} ${styles['new']}` : `${styles['message-object']}`}>
                <h1>{message.subject}</h1>
                <h4>{message.timeStamp}</h4>
                {message.senders.map((s, i) => <h4 key={i}>{s.name}</h4>)}
                {message.new ? <h6>Uusi</h6> : null}
        </div>
    )
}

const GradeList = ({grades}) => {
    if (grades.isLoading) return <LoadingScreen className={styles['loading-screen']} />;

    return (
        <>
        <Link className={styles['title']} to={'/grades'}>Opinnot</Link>

            <OverviewObject overview={grades['overview']} />
            {
                Object.keys(grades['grades']).map((subject, i) => {
                    const grade = grades['grades'][subject];

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
