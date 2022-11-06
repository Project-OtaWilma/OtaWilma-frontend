import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useAuth,
    loginToWilma
} from '../../features/authentication/authSlice';

import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';



export default function Login() {
    const auth = useSelector(useAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [termsOfService, setTermsOfService] = useState(false);
    const [agreement, setAgreement] = useState(false);

    const [loginError, setLoginError] = useState('');

    const login = (e) => {
        e.preventDefault();
        setLoginError('');

        if (!termsOfService || !agreement) return setLoginError('You must agree to both')

        const credentials =
        {
            username: username,
            password: password
        }

        dispatch(loginToWilma(credentials));
        navigate('/');
    }

    return (
        <div className={styles['content']}>
            <div className={styles['left']}>

            </div>
            <div className={styles['right']}>
                <h1>OtaWilma - Tervetuloa</h1>
                <h2>Kirjaudu sisään <strong>Wilma</strong>-tunnuksillasi</h2>
                <form className={styles['login-form']}>
                    <h3>Käyttäjätunnus</h3>
                    <input type='text' onInput={e => setUsername(e.target.value)} />
                </form>
                <form className={styles['login-form']}>
                    <h3>Salasana</h3>
                    <input type='password' onInput={e => setPassword(e.target.value)} />
                </form>
                <form className={styles['terms-of-service']}>
                    <h2>Ymmärrän, että <strong>OtaWilma ei ole</strong> virallinen Wilman
                            ylläpitämä ohjelmisto</h2>
                    <input type='checkbox' checked={termsOfService} onChange={e => setTermsOfService(e.target.checked)} />
                </form>
                <form className={styles['terms-of-service']}>
                    <h2>Hyväksyn <strong>käyttöehdot</strong> ja otan <strong>itse</strong> vastuun käyttäjäni
                            turvallisuudesta</h2>
                    <input type='checkbox' checked={agreement} onChange={e => setAgreement(e.target.checked)} />
                </form>
                <h5 className={styles['login-error']}>{auth.loginError ? auth.loginError : loginError}</h5>
                <button type='submit' value={'Kirjaudu sisään'} onClick={login}>Kirjaudu sisään</button>
            </div>
        </div>
    )
}