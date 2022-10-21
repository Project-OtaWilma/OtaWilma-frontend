import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    getConfig,
    useConfig
} from '../../features/themes/configSlice';

export default function ThemeProvider({ children }) {
    const dispatch = useDispatch();

    // componentDidMount
    useEffect(() => { dispatch(getConfig()) }, []);

    return (
        <>
            <h1>provider layer</h1>
            {children}
        </>
    )
}