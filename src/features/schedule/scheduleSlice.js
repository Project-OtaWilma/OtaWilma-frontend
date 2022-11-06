import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchSchedule
} from '../../requests/wilma-api';

const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
};

export const getWeek = createAsyncThunk(
    'schdule/getWeek',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const schedule = thunkAPI.getState().schedule.schedule;

            
            const auth = options['auth'];
            const date = options['date'] ? options['date'] : (new Date());
            const raw = date.toLocaleDateString('fi-FI', options);

            const cached = Object.keys(schedule).find(week => schedule[week].range.includes(raw));

            if(cached) return resolve({changed: false, date: cached});
            
            fetchSchedule(auth, date)
            .then(schedule => {
                return resolve({changed: true, date: raw, schedule: schedule});
            })
            .catch(err => {
                return reject(err);
            })
        });
    }
)

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        schedule: {},
        loaded: [],
        isLoading: false,
    },
    reducers: {},
    extraReducers: {
        [getWeek.fulfilled]: (state, action) => {
            if(!action.payload.changed) {
                state.current = action.payload.date;
                state.isLoading = false;
                return;
            }
            const date = action.payload.date;
            const schedule = action.payload.schedule;

            state.schedule[date] = {
                week: schedule.week,
                range: schedule.weekRange,
                days: schedule.days
            }
            state.loaded.push(action.payload.date);
            state.isLoading = false;
        },
        [getWeek.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
            state.isLoading = false;
        },
        [getWeek.pending]: (state, action) => {
            state.isLoading = true;
        }
    },
});



export const useSchedule = (state) => ({
    schedule: state.schedule.schedule,
    loaded: state.schedule.loaded,
    isLoading: state.schedule.isLoading,
});

export default scheduleSlice.reducer;
