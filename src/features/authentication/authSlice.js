import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../requests/utility';

import {
    login,
    logout
} from '../../requests/wilma-api';
import { handleError } from '../errors/errorSlice';


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
    return getCookie('token') ? getCookie('token') : null;
}


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: getToken(),
        loggedIn: !(!getToken()),
        loginError: null
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
                return;
            }
            const token = action.payload['token'];
            state.token = token;

            setToken(state.token);

            state.loggedIn = true;
        },
        [loginToWilma.pending]: (state, action) => {
            state.loginError = null;
        },
        [loginToWilma.rejected]: (state, action) => {
            state.loginError = 'Tuntemaon virhe - kirjautuminen epäonnistui';
        },
        [logoutFromWilma.fulfilled]: (state, action) => {
            setToken(null);
            state.token = null;
        },
        [resetSession.fulfilled]: (state, action) => {
            console.log('reseted');
            setToken(null);
            state.token = null;
        },
    },
});

export const useAuth = (state) => ({
    token: state.auth.token,
    loggedIn: state.auth.loggedIn,
    loginError: state.auth.loginError,
});

export default authSlice.reducer;
