import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    getConfig,
    useConfig
} from '../../features/themes/configSlice';

export default function Navbar() {
    const config = useSelector(useConfig);



    return (
        <>
            <div>
                <h1>{config.value['username'] ? username(config.value['username']) : 'loading...'}</h1>
                <h5>Opiskelija</h5>
                <Link to={'/login'}>Kirjaudu ulos</Link>
            </div>
            <Link to={'/'}>OtaWilma</Link>
            <Link to={'/'}>Viestit</Link>
            <Link to={'/'}>Opinnot</Link>
            <Link to={'/'}>Kurssitarjotin</Link>
            <Link to={'/'}>Opettajat</Link>
            <Link to={'/'}>Asetukset</Link>
        </>
    )
}

const username = (raw) => {
    return raw.split('.').length > 1 ? [raw.split('.')[0], raw.split('.')[raw.split('.').length - 1]].map(u => `${u.charAt(0).toUpperCase()}${u.slice(1)}`).join(' ') : raw;
}
