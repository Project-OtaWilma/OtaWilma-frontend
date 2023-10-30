import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getConfig, useConfig } from '../../features/themes/configSlice';
import { useGrades } from '../../features/grades/gradeSlice';
import { logoutFromWilma } from '../../features/authentication/authSlice';

import styles from './Navbar.module.css'

export default function Navbar() {
    const config = useSelector(useConfig);
    const grades = useSelector(useGrades);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const keyMap = {81:'/', 87:'/messages', 69: '/grades', 82:'/tray', 65:'/news', 83:'/teachers', 68:'/maps', 70:'/settings' }


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
            <Link to={'/messages'}><h5>Viestit</h5></Link>
            <Link to={'/grades'}><h5>Opinnot</h5></Link>
            {grades.yoResults.length > 0 ? <Link to={'/yo-results'}><h5>Ylioppilaskirjoitukset</h5></Link> : null}
            <Link to={'/tray'}><h5>Kurssitarjotin</h5></Link>
            <Link to={'/news'}><h5>Tiedotteet</h5></Link>
            <Link to={'/teachers'}><h5>Opettajat</h5></Link>
            <Link to={'/friends'}><h5>Kaverit</h5></Link>
            <Link to={'/maps'}><h5>Kartat</h5></Link>
            <Link to={'/settings'}><h5>Asetukset</h5></Link>
        </div>
    )
}

const username = (raw) => {
    return raw.split('.').length > 1 ? [raw.split('.')[0], raw.split('.')[raw.split('.').length - 1]].map(u => `${u.charAt(0).toUpperCase()}${u.slice(1)}`).join(' ') : raw;
}
