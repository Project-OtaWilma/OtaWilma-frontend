import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    getConfig,
    useConfig
} from '../../features/themes/configSlice';

export default function Navbar() {
    const config = useDispatch(useConfig);



    return (
        <>
            <p>{JSON.stringify(config)}</p>
            <div>
                <h1>Tuukka Moilanen</h1>
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