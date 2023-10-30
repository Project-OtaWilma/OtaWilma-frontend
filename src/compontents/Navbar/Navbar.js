import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getConfig, useConfig } from '../../features/themes/configSlice';
import { useGrades } from '../../features/grades/gradeSlice';
import { logoutFromWilma } from '../../features/authentication/authSlice';

import styles from './Navbar.module.css'

export default function Navbar() {
    const [count, setCount] = useState(9)
    const config = useSelector(useConfig);
    const grades = useSelector(useGrades);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const links = {
        '/messages': 'Viestit',
        '/grades': 'Opinnot',
        '/tray': 'Kurssitarjotin',
        '/friends': 'Kaverit',
        '/maps': 'Kartat',
        '/new': 'Tiedotteet',
        '/teachers': 'Opettajat',
        '/settings': 'Asetukset'
    }

    const updateDimensions = () => {
        const w = window.innerWidth;
        if (w > 1700) {
            setCount(9)
        } 
        else if (w > 1500 && w <= 1700) {
            setCount(6)
        }
        else if (w > 1300 && w <= 1500) {
            setCount(4)
        }
        else if (w > 1200 && w <= 1300) {
            setCount(3)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);


    return (
        <div className={styles['top']}>
            <div className={styles['user-info']}>
                <div className={styles['user-data']}>
                    <h1>{config.value ? username(config.value['username']) : '...'}</h1>
                    <h2>Opiskelija</h2>
                    <div className={styles['logout']} id="logout">
                    <a onClick={() => dispatch(logoutFromWilma())}>Kirjaudu ulos</a>
                    </div>
                </div>
            </div>
            <Link className={styles['logo-text']} to={'/'}><h1>OtaWilma</h1></Link>
            {grades.yoResults.length > 0 ? <Link to={'/yo-results'}><h5>Ylioppilaskirjoitukset</h5></Link> : null}
            {Object.keys(links).slice(0, count).map(href => {
                return <Link to={href}><h5>{links[href]}</h5></Link>
            })}
            {count < 9 ? <button className={styles['expand']}>{<h1>...</h1>}</button> : null}
            
        </div>
    )
}

const username = (raw) => {
    return raw.split('.').length > 1 ? [raw.split('.')[0], raw.split('.')[raw.split('.').length - 1]].map(u => `${u.charAt(0).toUpperCase()}${u.slice(1)}`).join(' ') : raw;
}
