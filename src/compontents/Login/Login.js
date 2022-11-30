import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useAuth,
    loginToWilma,
    getAgreement,
    setAgreement as saveAgreement
} from '../../features/authentication/authSlice';

import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { BlurLayer, LoadingScreen } from '../LoadingScreen/LoadingScreen';



export default function Login() {
    const auth = useSelector(useAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [termsOfService, setTermsOfService] = useState(getAgreement());
    const [agreement, setAgreement] = useState(getAgreement());

    const [loginError, setLoginError] = useState('');

    const login = () => {
        setLoginError('');

        if (!termsOfService || !agreement) return setLoginError('You must agree to both')

        const credentials =
        {
            username: username,
            password: password
        }

        dispatch(loginToWilma(credentials));
        saveAgreement();
        navigate('/');
    }


    return (
        <BlurLayer className={styles['content']} isLoading={auth.isLoading}>
            <div className={styles['left']}>

            </div>
            <div className={styles['right']}>
                <h1>OtaWilma - Tervetuloa</h1>
                <h2>Kirjaudu sisään <strong>Wilma</strong>-tunnuksillasi</h2>
                <form className={styles['login-form']} onSubmit={e => {e.preventDefault(); login()}}>
                    <h3>Käyttäjätunnus</h3>
                    <input type='text' placeholder='matti.heikkinen' onInput={e => setUsername(e.target.value)} />
                </form>
                <form className={styles['login-form']} onSubmit={e => {e.preventDefault(); login()}}>
                    <h3>Salasana</h3>
                    <input type='password' placeholder='*************' onInput={e => setPassword(e.target.value)} />
                </form>
                <form className={styles['terms-of-service']}>
                    <h2>Ymmärrän, että <strong>OtaWilma ei ole</strong> virallinen Wilman
                            ylläpitämä ohjelmisto</h2>
                    <input type='checkbox' checked={termsOfService} onChange={e => setTermsOfService(e.target.checked)} />
                </form>
                <form className={styles['terms-of-service']}>
                    <h2>Hyväksyn <strong onClick={() => window.open('/privacy-notice.html')}>tietosuojaselosteen</strong> ja otan <strong>itse</strong> vastuun käyttäjäni
                            turvallisuudesta</h2>
                    <input type='checkbox' checked={agreement} onChange={e => setAgreement(e.target.checked)} />
                </form>
                <h5 className={styles['login-error']}>{auth.loginError ? auth.loginError : loginError}</h5>
                <button type='submit' value={'Kirjaudu sisään'} onClick={login}>Kirjaudu sisään</button>
            </div>
        </BlurLayer>
    )
}