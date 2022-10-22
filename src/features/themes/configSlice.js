import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleError } from '../errors/errorSlice';
import {
    fetchConfig
} from '../../requests/theme-api';



export const getConfig = createAsyncThunk(
    'config/getConfig',
    async (options, thunkAPI) => {
        const auth = options['auth'];
        const response = await fetchConfig(auth);
        return response
    }
)


export const configSlice = createSlice({
    name: 'config',
    initialState: {
        config: null,
        isLoading: false,
        hasLoaded: false
    },
    reducers: {},
    extraReducers: {
        [getConfig.fulfilled]: (state, action) => {
            state.config = action.payload;
            state.isLoading = false;
            state.hasLoaded = true;
        },
        [getConfig.rejected]: (state, action) => {
            console.log('api call rejected');
            state.isLoading = false;

            handleError({err: action.error.message, resetAuth: true});
        },
        [getConfig.pending]: (state, action) => {
            state.isLoading = true;
        },
    },
});

export const useConfig = (state) => ({
    value: state.config.config,
    isLoading: state.config.isLoading,
    hasLoaded: state.config.hasLoaded
});

export default configSlice.reducer;
