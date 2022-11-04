import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNews, getNews, getNewsContent } from '../../features/news/newsSlice';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useParams } from 'react-router-dom';

import styles from './News.module.css';

export default function News() {
    const params = useParams();

    console.log(params);
    const [category, setCategory] = useState('current');
    const [current, setCurent] = useState(null);
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);

    const initialize = () => {
        loadNews('current');
    }

    const loadNews = (category) => {
        dispatch(getNews({auth: auth.token, path: category}));
        setCategory(category);
    }

    const loadNewsContent = (id) => {
        dispatch(getNewsContent({auth: auth.token, id: id}));
        setCurent(id);
    }
    
    useEffect(() => { initialize() }, []);

    return (
        <div className={styles['content']}>
            <div className={styles['side-bar']}>
                <div className={styles['categories']}>
                    <div onClick={() => loadNews('current')} className={category == 'current' ? styles['selected'] : null}>
                        Nykyiset
                    </div>
                    <div onClick={() => loadNews('old')} className={category == 'old' ? styles['selected'] : null}>
                        Vanhat
                    </div>
                    <div onClick={() => loadNews('static')} className={category == 'static' ? styles['selected'] : null}>
                        Pysyvät
                    </div>
                </div>
                <div className={styles['list']}>
                    <NewsList category={category} onLoad={loadNewsContent}/>
                </div>
            </div>
            <div className={styles['news-content']}>
                <NewsContentObject current={current}/>
            </div>
        </div>
    )
}

const NewsList = ({category, onLoad}) => {
    const news = useSelector(useNews);
    const list = news.list[category];
    const map = news.news;

    if(list.isLoading) return <LoadingScreen className={styles['list-loading-screen']} />

    return (
        <>
            {
                list['content'].map((id, i) => {
                    return <NewsObject key={i} news={map[id]} onLoad={onLoad}/>
                })
            }
        </>
    )
}

const NewsObject = ({news: n, onLoad}) => {
    
    return (
        <>
            <div 
                key={n.href}
                className={n.isInvalid ? `${n.date ? styles['news-object-current'] : styles['news-object-static']} ${styles['disabled']}`: `${n.date ? styles['news-object-current'] : styles['news-object-static']}`}
                onClick={() => onLoad(n.id)}
            >
                <h1>{n.title}</h1>
                <h2>{n.date}</h2>
                <h2>{n.sender ? n.sender.name : <></>}</h2>
                <h3>{n.description}</h3>
                <h4>{n.date ? null : "Lue tiedote"}</h4>
                {n.isInvalid ? <h5>Tiedotteella ei ole tämän enempää sisältöä.</h5> : <></>} 
            </div>
        </>
    )
}

const NewsContentObject = ({current}) => {
    const news = useSelector(useNews);
    const map = news.news;

    if(!current) return <></>
    if(map[current].isLoading) return <LoadingScreen className={styles['news-loading-screen']} />
    
    const n = map[current];

    return <>
        <div dangerouslySetInnerHTML={{__html: n.content}}>

        </div>
    </>
}
