import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authSlice } from '../authentication/authSlice';

export const handleError = (options = {err: {}, resetAuth: false}) => {
    const raw = options.err;
    const err = JSON.parse(raw);

    // TODO
    switch(err.status) {
        case 401:
            console.log(err.error);
            break;
        default:
            console.log(err.error);
            break;
    }
    
}

export const errorSlice = createSlice({
    name: 'errors',
    initialState: {
        error: {}
    },
    reducers: {
        handleError
    },
    extraReducers: {

    },
});

export const useErrors = (state) => ({
    error: state.errors.error,
});

export default errorSlice.reducer;
