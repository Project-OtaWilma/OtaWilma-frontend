import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useAuth,
    loginToWilma,
    getAgreement,
    setAgreement as saveAgreement
} from '../../features/authentication/authSlice';

import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { BlurLayer } from '../LoadingScreen/LoadingScreen';
import { useVersion } from '../../features/version/versionSlice';

const { versionLabel } = require('../../config.json');



export default function Login() {
    const auth = useSelector(useAuth);
    const version = useSelector(useVersion);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [termsOfService, setTermsOfService] = useState(getAgreement());
    const [agreement, setAgreement] = useState(getAgreement());

    const [loginError, setLoginError] = useState('');

    const usernameElement = useRef(null);
    const passwordElement = useRef(null);

    const login = () => {
        setLoginError('');
        const credentials =
        {
            username: username !== "" ? username : usernameElement.current.value,
            password: password !== "" ? password : passwordElement.current.value
        }

        if (!termsOfService || !agreement) return setLoginError('You must agree to both')

        dispatch(loginToWilma(credentials));
        saveAgreement();
        navigate('/');
    }

    useEffect(() => {

        const handleEnter = (e) => {
            switch (e.keyCode) {
                case 13:
                    login();
                    break;
                default:
                    break;
            }
        }

        document.addEventListener('keydown', handleEnter);
        return () => {document.removeEventListener('keydown', handleEnter);}
        // unsafe and unstable as fuck, but well it is react
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <BlurLayer className={styles['content']} isLoading={auth.isLoading}>
            <div className={styles['left']} />
            <div className={styles['right']}>
                <h1>OtaWilma - Tervetuloa</h1>
                <h2>Kirjaudu sisään <strong>Wilma</strong>-tunnuksillasi</h2>
                <form className={styles['login-form']} onSubmit={e => {e.preventDefault(); login()}}>
                    <h3>Käyttäjätunnus</h3>
                    <input ref={usernameElement} type='text' autoComplete='on' placeholder='matti.heikkinen' onChange={e => setUsername((e.target.value).toLowerCase())} />
                </form>
                <form className={styles['login-form']} onSubmit={e => {e.preventDefault(); login()}}>
                    <h3>Salasana</h3>
                    <input ref={passwordElement} type='password' autoComplete='on' placeholder='*************' onChange={e => setPassword(e.target.value)} />
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
                <h6>{`${[versionLabel]} ${version.isLoading ? '...' : version.version}`}</h6>
            </div>
        </BlurLayer>
    )
}