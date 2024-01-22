import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { handleError } from '../errors/errorSlice';
import { fetchStatisticsLatest, fetchStatisticsHourly, fetchStatisticsRequests, fetchStatisticsRequestsWeekday } from '../../requests/statistics';


export const getLatest = createAsyncThunk(
    'statistcs/getLatest',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {

            fetchStatisticsLatest()
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return reject();
            })
        });
    }
)

export const getHourly = createAsyncThunk(
    'statistcs/getHourly',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {

            fetchStatisticsHourly()
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return reject();
            })
        });
    }
)

export const getRequests = createAsyncThunk(
    'statistcs/getRequests',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {

            fetchStatisticsRequests()
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return reject();
            })
        });
    }
)

export const getRequestsWeekday = createAsyncThunk(
    'statistcs/getRequestsWeekday',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {

            fetchStatisticsRequestsWeekday()
            .then(data => {
                return resolve(data);
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
        },
        hourly: {
            isLoading: true,
            data: []
        },
        requests: {
            isLoading: true,
            data: []
        },
        requestsWeekday: {
            isLoading: true,
            data: []
        }
    },
    reducers: {},
    extraReducers: {
        [getLatest.fulfilled]: (state, action) => {
            state.latest.data = action.payload.entries;
            state.latest.isLoading = false;
        },
        [getLatest.rejected]: (state, action) => {
            //
        },
        [getHourly.fulfilled]: (state, action) => {
            state.hourly.data = action.payload.entries;
            state.hourly.isLoading = false;
        },
        [getHourly.rejected]: (state, action) => {
            //
        },
        [getRequests.fulfilled]: (state, action) => {
            state.requests.data = action.payload;
            state.requests.isLoading = false;
        },
        [getRequests.rejected]: (state, action) => {
            //
        },
        [getRequestsWeekday.fulfilled]: (state, action) => {
            state.requestsWeekday.data = action.payload;
            state.requestsWeekday.isLoading = false;
        },
        [getRequestsWeekday.rejected]: (state, action) => {
            //
        },
    },
});

export const useStatistics = (state) => ({
    latest: state.statistics.latest,
    hourly: state.statistics.hourly,
    requests: state.statistics.requests,
    requestsWeekday: state.statistics.requestsWeekday
});

export default statisticsSlice.reducer;
