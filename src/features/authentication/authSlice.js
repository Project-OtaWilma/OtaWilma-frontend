import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from "react-router-dom";
import { getCookie } from '../../requests/utility';

import {
    login,
    logout
} from '../../requests/wilma-api';


export const loginToWilma = createAsyncThunk(
    'auth/loginToWilma',
    async (data, thunkAPI) => {
        const response = await login(data)
        return response
    }
)

export const logoutFromWilma = createAsyncThunk(
    'auth/logoutFromWilma',
    async (data, thunkAPI) => {
        const response = await logout();
        return response
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
    },
    reducers: {},
    extraReducers: {
        [loginToWilma.fulfilled]: (state, action) => {
            state.token = action.payload.token;
            setToken(state.token);

            state.loggedIn = true;
            state.logginIn = false;
        },
        [loginToWilma.rejected]: (state, action) => {
            console.log('api call rejected');
            const e = JSON.parse(action.error.message);

            state.loginError = e.error ? e.error.err : e.err;
            state.logginIn = false;
        },
        [loginToWilma.pending]: (state, action) => {
            state.logginIn = false;
            state.loginError = '';
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
    logginIn: state.auth.logginIn,
    loginError: state.auth.loginError,
});

export default authSlice.reducer;
