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
        error: false
    },
    reducers: {
        setPublicFlag: (state, action) => {
            state.config['public'] = true;
            return state;
        }
    },
    extraReducers: {
        [getConfig.fulfilled]: (state, action) => {
            state.config = action.payload['config'];
            state.error = false;
            state.isLoading = false;
        },
        [getConfig.rejected]: (state, action) => {
            console.log('api call rejected');
            state.error = true;
            state.isLoading = false;
        },
    },
});

export const useConfig = (state) => ({
    value: state.config.config,
    isLoading: state.config.isLoading,
});

export const { setPublicFlag } = configSlice.actions;

export default configSlice.reducer;
