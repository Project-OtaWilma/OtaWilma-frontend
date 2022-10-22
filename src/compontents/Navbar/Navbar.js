import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useConfig } from '../../features/themes/configSlice';

import styles from './Navbar.module.css'

export default function Navbar() {
    const config = useSelector(useConfig);


    return (
        <div className={styles['top']}>
            <div className={styles['user-info']}>
                <div className={styles['user-data']}>
                    <h1>{config.value['username'] ? username(config.value['username']) : '...'}</h1>
                    <h2>Opiskelija</h2>
                    <div className={styles['logout']} id="logout">
                    <Link to={'/login'}>Kirjaudu ulos</Link>
                    </div>
                </div>
            </div>
            <Link className={styles['logo-text']} to={'/'}><h1>OtaWilma</h1></Link>
            <Link to={'/'}><h5>Viestit</h5></Link>
            <Link to={'/'}><h5>Opinnot</h5></Link>
            <Link to={'/'}><h5>Kurssitarjotin</h5></Link>
            <Link to={'/'}><h5>Opettajat</h5></Link>
            <Link to={'/'}><h5>Asetukset</h5></Link>
        </div>
        
    )
}

const username = (raw) => {
    return raw.split('.').length > 1 ? [raw.split('.')[0], raw.split('.')[raw.split('.').length - 1]].map(u => `${u.charAt(0).toUpperCase()}${u.slice(1)}`).join(' ') : raw;
}
