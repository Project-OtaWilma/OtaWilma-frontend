import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleError } from '../errors/errorSlice';
import {
    fetchConfig
} from '../../requests/theme-api';



export const getConfig = createAsyncThunk(
    'config/getConfig',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            
            const auth = options['auth'];
            fetchConfig(auth)
            .then(config => {
                return resolve({config: config});
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err));
                return reject(err);
            })
        })
    }
)


export const configSlice = createSlice({
    name: 'config',
    initialState: {
        config: null,
        isLoading: true,
    },
    reducers: {},
    extraReducers: {
        [getConfig.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.config = action.payload['config'];
            state.isLoading = false;
        },
        [getConfig.rejected]: (state, action) => {
            console.log('api call rejected');
            state.isLoading = false;
        },
    },
});

export const useConfig = (state) => ({
    value: state.config.config,
    isLoading: state.config.isLoading,
});

export default configSlice.reducer;
