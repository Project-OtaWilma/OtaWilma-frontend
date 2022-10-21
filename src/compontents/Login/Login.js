import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useAuth,
    loginToWilma
} from '../../features/authentication/authSlice';


export default function Login() {
    const auth = useSelector(useAuth);
    const dispatch = useDispatch();
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

    }


    // componentDidMount
    useEffect(() => { console.log('Hello world!') }, []);

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={login}>
                <p>{JSON.stringify(auth)}</p>
                <h6>Username</h6>
                <input type='text' onInput={e => setUsername(e.target.value)} />
                <h6>Password</h6>
                <input type='password' onInput={e => setPassword(e.target.value)} />
                <h4>{auth.loginError ? auth.loginError : loginError}</h4>
                <h6>Hyväksyn käyttäehdot</h6>
                <input type='checkbox' checked={termsOfService} onChange={e => setTermsOfService(e.target.checked)} />
                <h6>Tiedostan asian</h6>
                <input type='checkbox' checked={agreement} onChange={e => setAgreement(e.target.checked)} />
                <br />
                <input type='submit' value={'Kirjaudu sisään'} />
            </form>
        </>
    )
}