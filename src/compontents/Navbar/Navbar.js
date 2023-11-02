import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getConfig, useConfig } from '../../features/themes/configSlice';
import { useGrades } from '../../features/grades/gradeSlice';
import { logoutFromWilma } from '../../features/authentication/authSlice';

import styles from './Navbar.module.css'

export default function Navbar() {
    const [count, setCount] = useState(0);
    const [expanded, setExpanded] = useState(false);
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
        '/news': 'Tiedotteet',
        '/teachers': 'Opettajat',
        '/settings': 'Asetukset'
    }

    const viewPorts = [
        [9, [1650, 5000]],
        [8, [1550, 1650]],
        [6, [1550, 1650]],
        [5, [1450, 1550]],
        [4, [1350, 1450]],
        [3, [1245, 1350]],
        [5, [1200, 1245]],
        [3, [900, 1200]],
    ]

    const updateDimensions = () => {
        setExpanded(false)
        const w = window.innerWidth;

        viewPorts.forEach(([c, [min, max]], i) => {
            if (w > min && w <= max) {
                setCount(c);
            }
        });
    }

    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const onExpand = () => {
        if (expanded) return onMinimize();

        setCount(9);
        setExpanded(true);
        document.documentElement.style.setProperty('--container', '50px')
        
    }

    const onMinimize = () => {
        updateDimensions();
        document.documentElement.style.setProperty('--container', '0px')
    }

    const onRedirect = () => {
        onMinimize()
    }

    return (
        <div className={`${styles['top']} ${expanded ? styles['expanded'] : ''}`}>
            <div className={styles['user-info']}>
                <div className={styles['user-data']}>
                    <h1>{config.value ? username(config.value['username']) : '...'}</h1>
                    <h2>Opiskelija</h2>
                    <div className={styles['logout']} id="logout">
                    <a onClick={() => dispatch(logoutFromWilma())}>Kirjaudu ulos</a>
                    </div>
                </div>
            </div>
            <div className={styles['links']}>
                <Link className={styles['logo-text']} to={'/'} onClick={onRedirect}><h1>OtaWilma</h1></Link>
                {grades.yoResults.length > 0 ? <Link to={'/yo-results'} ><h5>Ylioppilaskirjoitukset</h5></Link> : null}
                {Object.keys(links).slice(0, count).map(href => {
                    return <Link onClick={onRedirect} to={href}><h5>{links[href]}</h5></Link>
                })}
                {(expanded || count < 9) ? <button onClick={onExpand} className={styles['expand']}>{<h1>...</h1>}</button> : null}
            </div>
            
        </div>
    )
}

const username = (raw) => {
    return raw.split('.').length > 1 ? [raw.split('.')[0], raw.split('.')[raw.split('.').length - 1]].map(u => `${u.charAt(0).toUpperCase()}${u.slice(1)}`).join(' ') : raw;
}
