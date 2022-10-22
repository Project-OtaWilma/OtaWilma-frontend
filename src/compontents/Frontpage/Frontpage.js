import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../features/authentication/authSlice';
import { useMessages, getMessages } from '../../features/messages/messageSlice';


export default function Frontpage() {
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const messages = useSelector(useMessages);

    const initialize = () => {
        console.log('ready!');
        dispatch(getMessages({auth: auth.token, path: 'inbox'}))
    }

    // componentDidMount
    useEffect(() => { initialize() }, []);

    return (
        <>
            <h1>Frontpage</h1>
            <p>{JSON.stringify(messages)}</p>
        </>
    )
}