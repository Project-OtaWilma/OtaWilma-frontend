import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../requests/utility';

import {
    login,
    logout
} from '../../requests/wilma-api';
import { handleError } from '../errors/errorSlice';
import crypto from 'crypto-js';

import config from '../../config.json'

export const loginToWilma = createAsyncThunk(
    'auth/loginToWilma',
    async (data, thunkAPI) => {
        return new Promise((resolve, reject) => {
            login(data)
                .then(res => {
                    return resolve({error: false, token: res['token']})
                })
                .catch(err => {
                    switch(err.status) {
                        case 401:
                            return resolve({error: true, err: err});
                        case 400:
                            return resolve({error: true, err: err});
                        default:
                            thunkAPI.dispatch(handleError(err))
                            return reject(err);
                    }
                })
        });
    }
)

export const logoutFromWilma = createAsyncThunk(
    'auth/logoutFromWilma',
    async (data, thunkAPI) => {
        return new Promise((resolve, reject) => {
            logout(data)
                .then(() => {
                    return resolve()
                })
                .catch(() => {
                    return resolve();
                }) 
        });
    }
)

export const resetSession = createAsyncThunk(
    'auth/resetSession',
    async (data, thunkAPI) => {
        return new Promise((resolve, reject) => {
            return resolve();
        })
    }
)

const setToken = (token) => {
    document.cookie = `token=${token}; SameSite=Lax; Secure;`;
}

const getToken = () => {
    return getCookie('token') ? (getCookie('token') === 'null' ? null : getCookie('token')) : null;
}

export const getAgreement = () => {
    const agreement = window.localStorage.getItem('agreement');
    if(!agreement) window.localStorage.setItem('agreement', false);
    return agreement ? (agreement === 'true') : false;
}

export const setAgreement = () => {
    return window.localStorage.setItem('agreement', true);
}

export const getSavedCredentials = () => {
    const encrypted = window.localStorage.getItem('saved-credentials');
    if(!encrypted) window.localStorage.setItem('saved-credentials', null);

    if (encrypted === "null") return null;
    
    const decrypted = crypto.AES.decrypt(encrypted, config.signature).toString(crypto.enc.Utf8);
    try {
        const credentials = JSON.parse(decrypted);
        return credentials;
    } catch (e) {
        window.localStorage.setItem('saved-credentials', null);
        return;
    }
}

export const setSavedCredentials = (credentials) => {
    const raw = JSON.stringify(credentials);
    const encrypted = crypto.AES.encrypt(raw, config.signature);

    return window.localStorage.setItem('saved-credentials', encrypted);
}

export const resetSavedCredentials = () => {
    return window.localStorage.setItem('saved-credentials', null);
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: getToken(),
        loggedIn: !(!getToken()),
        loginError: null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: {
        [loginToWilma.fulfilled]: (state, action) => {
            const errors = {
                'Invalid credentials': 'Käyttäjätunnusta ei löydy tai salasana on väärä',
                'Failed to parse Cookie': 'Käyttäjätunnusta ei löydy tai salasana on väärä'
            }

            if(action.payload.error) {
                const error = action.payload['err'];
                const raw = error.error ? error.error.err : error.err;
                state.loginError = Object.keys(errors).includes(raw) ? errors[raw] : raw;
                state.isLoading = false;
                resetSavedCredentials();
                return;
            }
            const token = action.payload['token'];
            state.token = token;

            setToken(state.token);

            state.loggedIn = true;
            state.isLoading = false;
        },
        [loginToWilma.pending]: (state, action) => {
            state.loginError = null;
            state.isLoading = true;
        },
        [loginToWilma.rejected]: (state, action) => {
            state.loginError = 'Tuntemaon virhe - kirjautuminen epäonnistui';
            state.isLoading = false;
        },
        [logoutFromWilma.fulfilled]: (state, action) => {
            setToken(null);
            state.token = null;
        },
        [resetSession.fulfilled]: (state, action) => {
            setToken(null);
            state.token = null;
        },
    },
});

export const useAuth = (state) => ({
    token: state.auth.token,
    loggedIn: state.auth.loggedIn,
    loginError: state.auth.loginError,
    isLoading: state.auth.isLoading
});

export default authSlice.reducer;
