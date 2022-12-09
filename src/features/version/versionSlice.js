import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleError } from '../errors/errorSlice';
import { getVersion as fetchVersion } from '../../requests/wilma-api';


export const getVersion = createAsyncThunk(
    'version/getVersion',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            
            fetchVersion()
                .then(version => {
                    return resolve(version);
                })
                .catch(err => {
                    thunkAPI.dispatch(handleError(err));
                    return reject(err);
                })
        })
    }
)


export const versionSlice = createSlice({
    name: 'version',
    initialState: {
        version: null,
        isLoading: true,
    },
    reducers: {},
    extraReducers: {
        [getVersion.fulfilled]: (state, action) => {
            state.version = action.payload['version'];
            state.isLoading = false;
        },
        [getVersion.rejected]: (state, action) => {
            console.log('api call rejected');
            state.isLoading = false;
        },
    },
});

export const useVersion = (state) => ({
    version: state.version.version,
    isLoading: state.version.isLoading,
});

export default versionSlice.reducer;
