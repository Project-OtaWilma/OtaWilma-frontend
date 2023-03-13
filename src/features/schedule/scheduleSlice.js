import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchSchedule
} from '../../requests/wilma-api';

import { handleError } from '../errors/errorSlice';


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
                thunkAPI.dispatch(handleError(err))
                return reject();
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
            let height = 0;


            Object.keys(schedule.days).forEach(day => {
                let le = [...schedule.days[day].lessons]

                le.forEach((lesson, i) => {
                    const groupOffset = lesson.groups.length === 1 ? 0 : lesson.groups.length * 17;
    
                    for (let j = i; j < le.length; j++) {
                        const l = le[j];
                        const h = l.endRaw + groupOffset;
                        const e = `${day} ${l.end}`;
                        const s = `${day} ${l.start}`;

                        height = ((h - 400) > height ? (h - 400) : height);
    
                        le[j] = {...l, startRaw: l.startRaw + groupOffset, endRaw: h, endTime: e, startTime: s}
                    }
    
                    le[i] = {...le[i], durationRaw: le[i].durationRaw + groupOffset}
                })

                schedule.days[day].lessons = le;
            });

            state.schedule[date] = {
                week: schedule.week,
                height: height,
                range: schedule.weekRange,
                days: schedule.days
            }

            state.loaded.push(action.payload.date);
            state.isLoading = false;
        },
        [getWeek.rejected]: (state, action) => {
            
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
