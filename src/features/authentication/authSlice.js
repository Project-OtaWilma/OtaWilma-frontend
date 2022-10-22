import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from "react-router-dom";
import { getCookie } from '../../requests/utility';

import {
    login,
} from '../../requests/wilma-api';


export const loginToWilma = createAsyncThunk(
    'auth/loginToWilma',
    async (data, thunkAPI) => {
        const response = await login(data)
        return response
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
        logginIn: false,
        loginError: ''
    },
    reducers: {
        resetSession: (state) => {
            
        }
    },
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
    },
});

export const useAuth = (state) => ({
    token: state.auth.token,
    loggedIn: state.auth.loggedIn,
    logginIn: state.auth.logginIn,
    loginError: state.auth.loginError,
});

export default authSlice.reducer;
