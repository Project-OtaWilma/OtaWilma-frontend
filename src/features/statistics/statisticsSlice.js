import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { handleError } from '../errors/errorSlice';
import { fetchStatisticsLatest } from '../../requests/statistics';


export const getLatest = createAsyncThunk(
    'statistcs/getLatest',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            
            fetchStatisticsLatest()
            .then(data => {
                console.log(data);
                //return resolve({changed: true, path: path, news: data})
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return reject();
            })
        });
    }
)


export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        latest: {
            isLoading: true,
            data: []
        }
    },
    reducers: {},
    extraReducers: {
        [getLatest.fulfilled]: (state, action) => {
            console.log(action.payload);
        },
        [getLatest.rejected]: (state, action) => {
            //
        },

    },
});

export const useStatistics = (state) => ({
    latest: state.statistics.latest,
});

export default statisticsSlice.reducer;
