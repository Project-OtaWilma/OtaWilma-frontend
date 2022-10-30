import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNews, getNews } from '../../features/news/newsSlice';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

import styles from './News.module.css';

export default function News() {
    const [category, setCategory] = useState('current');
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);

    const initialize = () => {
        loadNews('current');
    }

    const loadNews = (category) => {
        dispatch(getNews({auth: auth.token, path: category}));
        setCategory(category);
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
                    <NewsList category={category}/>
                </div>
            </div>
        </div>
    )
}

const NewsList = ({category}) => {
    const news = useSelector(useNews);
    const list = news.list[category];
    const map = news.news;

    if(list.isLoading) return <LoadingScreen className={styles['list-loading-screen']} />

    return (
        <>
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
            <div key={n.href} className={n.isInvalid ? `${n.date ? styles['news-object-current'] : styles['news-object-static']} ${styles['disabled']}`: `${n.date ? styles['news-object-current'] : styles['news-object-static']}`}>
                <h1>{n.title}</h1>
                <h2>{n.date}</h2>
                <h2>{n.sender ? n.sender.name : <></>}</h2>
                <h3>{n.description}</h3>
                {n.isInvalid ? <h5>Tiedotteella ei ole tämän enempää sisältöä.</h5> : <></>} 
            </div>
        </>
    )
}
