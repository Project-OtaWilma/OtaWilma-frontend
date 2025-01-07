import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useGrades, getGradebook } from '../../features/grades/gradeSlice';
import { useMessages, getMessages, getMessage } from '../../features/messages/messageSlice';
import { LoadingScreen, PlaceHolder } from '../LoadingScreen/LoadingScreen';
import { useParams } from 'react-router-dom';

import styles from './Messages.module.css';

export default function Messages() {
    const params = useParams();

    const [category, setCategory] = useState('inbox');
    const [current, setCurrent] = useState(null);
    const [bulkMode, setBulkMode] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);

    const container = useRef(null);

    const initialize = () => {
        loadMessages('inbox');

        if(params.id) loadMessage(params.id);
    }

    const loadMessages = (category) => {
        dispatch(getMessages({auth: auth.token, path: category}))
        setCategory(category);
    }

    const loadMessage = (id, autoUnread) => {
        dispatch(getMessage({auth: auth.token, id: id, autoUnread }))
        setCurrent(id);
    }
    
    useEffect(() => { initialize() }, []);

    return (
        <div className={bulkMode ? styles['content-bulk'] : styles['content']}>
            <div className={styles['categories']}>
                {
                    bulkMode ?
                    <>
                        <h1 className={styles['title']}>Kaikki viestit yhdessä näkymässä</h1>
                        <button onClick={() => { setBulkMode(false) }} className={styles['action']}>Takaisin</button>
                    </>
                    :
                    <>
                        <div onClick={() => loadMessages('inbox')} className={category == 'inbox' ? styles['category-selected'] : null}>
                            <h1>Saapuneet</h1>
                        </div>
                        <div onClick={() => loadMessages('outbox')} className={category == 'outbox' ? styles['category-selected'] : null}>
                            <h1>Lähetetyt</h1>
                        </div>
                        <div onClick={() => loadMessages('appointments')} className={category == 'appointments' ? styles['category-selected'] : null}>
                            <h1>Tapahtumakutsut</h1>
                        </div>
                        {
                            auth.isTeacher ?
                            <button onClick={() => { setBulkMode(true) }} className={styles['action']}>Avaa kaikki lukemattomat</button>
                            :
                            null
                        }
                    </>
                }

            </div>
            {
                bulkMode ?
                null
                :
                <div className={styles['messages']}>
                    <div className={styles['list']}>
                        <MessageList category={category} onLoad={loadMessage}/>
                    </div>
                </div>
            }
            <div ref={container} className={styles['message-content']}>
                {
                    bulkMode ?
                    <MessageObjectList container={container} setBulk={setBulkMode} setCurrent={setCurrent} />
                    :
                    <MessageContentObject current={current} />
                }
            </div>
        </div>
    )
}

const MessageList = ({category, onLoad}) => {
    const messages = useSelector(useMessages);
    const list = messages.list[category];
    const map = messages.messages;

    if(list.isLoading) return <LoadingScreen className={styles['list-loading-screen']}/>

    return (
        <>
            {
                list['content'].map((id, i) => {
                    return <MessageObject key={i} message={map[id]} onLoad={onLoad}/>
                })
            }
        </>
    )
}

const MessageObject = ({message, onLoad}) => {
    return (
        <div onClick={() => onLoad(message.id, false)} className={message.new ? `${styles['message-object']} ${styles['new']}` : `${styles['message-object']}`}>
                <h1>{message.subject}</h1>
                <h2>{message.timeStamp}</h2>
                {message.senders ? message.senders.map((s, i) => <h2 key={i}>{s.name}</h2>) : null}
                {message.replies ? <h3>{`${message.replies} ${message.replies > 1 ? 'vastausta' : ' vastaus'}`}</h3> : null}
                {message.new ? <h6>Uusi</h6> : null}
        </div>
    )
}

const MessageContentObject = ({current}) => {

    const messages = useSelector(useMessages);
    const map = messages.messages;
    
    if(!current) return <PlaceHolder className={styles['message-placeholder']} />
    if(!Object.keys(map).includes(`${current}`)) return <PlaceHolder className={styles['message-placeholder']} />
    if(map[current].isLoading) return <LoadingScreen className={styles['message-loading-screen']}/>

    const message = map[current];

    return (
        <>
            <h1>{message.subject}</h1>
            <div className={styles['info']}>
                <ul><a>Lähettäjä(t) </a>{message.senders ? message.senders.map((s, i) => <a key={i}>{s.name}</a>) : null}</ul>
                <ul>Vastaanottaja(t) <a></a><a>{message.recipients ? message.recipients : 'Piilotettu'}</a></ul>
                <ul>Lähetetty <a></a><a>{message.timeStamp}</a></ul>
            </div>
            <div className={styles['main-content']}>
                <div dangerouslySetInnerHTML={{__html: message.content}}></div>
                <WilmaLink message={message} />
            </div>
            <div className={styles['responses']}>
                {
                    message.replyList.map((reply, i) => {
                        return <MessageReply key={i} reply={reply} />
                    })
                }
            </div>
        </>
    )
}

const MessageReply = ({reply}) => {
    return (
        <div className={`${styles['message-reply']} ${styles['other']}`}>
            <div dangerouslySetInnerHTML={{__html: reply.content}} />
            <h4>{`${reply.sender} ${reply.timeStamp}`}</h4>
        </div>
    )
}

const WilmaLink = ({message}) => {
    return (
        <>
            {
                message.fromWilma ? 
                <div className={styles['wilma-link']}>
                    <div className={styles['icon']}></div>
                    <h6 className={styles['icon-text']}>Avaa Wilmassa</h6>
                </div>
                : <></>
            }
        </>
    )
}

const MessageObjectList = ({ container, setBulk, setCurrent }) => {
    const messages = useSelector(useMessages);
    const map = messages.messages;

    const list = Object.keys(map).filter(k => map[k].new);

    if (list.length <= 0) {
        return <PlaceHolder className={styles['message-placeholder']} />
    }

    return (
        <>
            {list.reverse().map((id, i) => {
                return <MessageContentObjectFull key={i} id={id} container={container} setBulk={setBulk} setCurrent={setCurrent} />
            })}
        </>
    )
}

const MessageContentObjectFull = ({ id, container, setBulk, setCurrent }) => {
    const ref = useRef(null);
    const isVisible = useOnScreen(ref, container);
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const messages = useSelector(useMessages);

    const message = messages.messages[id];

    const [initialized, initialize] = useState(false);

    useEffect(() => {
        if (isVisible && !initialized) {
            setTimeout(() => {
                dispatch(getMessage({auth: auth.token, id: message.id, autoUnread: true }))
                initialize(true);
            }, 100);
        }
    }, [isVisible]);

    const markRead = () => {
        dispatch(getMessage({auth: auth.token, id: message.id, autoUnread: false, forceRefresh: true }))
    }

    const respond = () => {
        setCurrent(message.id);
        setBulk(false);
    }


    return (
        <div ref={ref} className={`${styles['message-full']} ${styles['full']}`}>
            <h1>{message.subject}</h1>
            <div className={styles['info']}>
                <ul><a>Lähettäjä(t) </a>{message.senders ? message.senders.map((s, i) => <a key={i}>{s.name}</a>) : null}</ul>
                <ul>Vastaanottaja(t) <a></a><a>{message.recipients ? message.recipients : 'Piilotettu'}</a></ul>
                <ul>Lähetetty <a></a><a>{message.timeStamp}</a></ul>
            </div>
            {
                message.isLoading ? 
                <LoadingScreen className={styles['message-full-loading-screen']}/>
                :
                <>
                    <div className={styles['actions']}>
                        <button onClick={markRead} className={styles['action']}>Merkitse luetuksi</button>
                        <button onClick={respond} className={styles['action']}>Vastaa viestiin</button>
                    </div>
                    <div className={styles['main-content']}>
                        <div dangerouslySetInnerHTML={{__html: message.content}}></div>
                    </div>
                    <div className={styles['responses']}>
                        {
                            (message.replyList ?? []).map((reply, i) => {
                                return <MessageReply key={i} reply={reply} />
                            })
                        }
                    </div>
                
                </>
            }

        </div>
    )
}



// https://stackoverflow.com/questions/45514676/how-to-check-if-element-is-visible-in-dom
export function useOnScreen(ref, container) {

    const [isIntersecting, setIntersecting] = useState(false)
  
    const observer = useMemo(() => {
        return new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting)
        }, { root: container.current })
    }, [ref]);

  
    useEffect(() => {
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])
  
    return isIntersecting
  }