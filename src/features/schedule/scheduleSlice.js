import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchSchedule
} from '../../requests/wilma-api';

import { handleError } from '../errors/errorSlice';


export const getWeek = createAsyncThunk(
    'schdule/getWeek',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const schedule = thunkAPI.getState().schedule.weeks;

            
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

export const getMonth = createAsyncThunk(
    'schdule/getMonth',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const schedule = thunkAPI.getState().schedule.months;

            const auth = options['auth'];
            const date = new Date((options['date'] ? options['date'] : (new Date())).getFullYear(), (options['date'] ? options['date'] : (new Date())).getMonth(), 1);
            const raw = date.toLocaleDateString('fi-FI');

            const cached = Object.keys(schedule).includes(`${date.getMonth() + 1}`);
            if (cached) return resolve({ changed: false });

            fetchSchedule(auth, date, true)
            .then(schedule => {
                return resolve({changed: true, month: schedule.month, schedule: schedule});
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
        weeks: {},
        months: {},
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

            state.weeks[date] = {
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
        },
        [getMonth.fulfilled]: (state, action) => {
            if(!action.payload.changed) {
                return;
            }

            const month = action.payload.month;
            const schedule = action.payload.schedule;

            Object.keys(schedule.days).forEach(date => {
                const day = schedule.days[date];
                let last = 510;

                day.lessons.forEach((lesson, i) => {
                    const { startRaw, endRaw, durationRaw } = lesson;
                    const delta = startRaw - last;
                    if (delta > 0) {
                        day.lessons.push({
                            groups: [],
                            start: toMinutes(last),
                            startRaw: last,
                            end: toMinutes(startRaw),
                            endRaw: startRaw,
                            durationRaw: delta,
                        });
                    }
                    last = endRaw;
                });

                day.lessons = day.lessons.sort((a, b) => a.startRaw - b.startRaw).map(lesson => ({...lesson, empty: lesson.groups.length <= 0}));
            });

            state.months[month] = {
                month: month,
                range: schedule.monthRange,
                days: schedule.days
            }
        },
        [getMonth.pending]: (state, action) => {
            //
        },
        [getMonth.rejected]: (state, action) => {
            //
        }
    },
});

const toMinutes = (i) => `${Math.floor(i / 60).toLocaleString(undefined, {minimumIntegerDigits: 2})}:${(((i / 60) - Math.floor(i / 60)) * 60).toLocaleString(undefined, {minimumIntegerDigits: 2})}`;

export const useSchedule = (state) => ({
    weeks: state.schedule.weeks,
    months: state.schedule.months,
    loaded: state.schedule.loaded,
    isLoading: state.schedule.isLoading,
});

export default scheduleSlice.reducer;
