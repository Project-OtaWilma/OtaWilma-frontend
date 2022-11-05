import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchTrayList,
    fetchPeriod
} from '../../requests/wilma-api';

export const getTrayList = createAsyncThunk(
    'tray/getTrayList',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const tray = thunkAPI.getState().tray;
            const auth = options['auth'];

            if(!tray.tray.isLoading) return resolve({changed: false});
            
            fetchTrayList(auth)
            .then(list => {
                return resolve({changed: true, periods: list['own']})
            })
            .catch(err => {
                return reject(err);
            })
            
        });
    }
)

export const getPeriod = createAsyncThunk(
    'tray/getPeriod',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            
            const tray = thunkAPI.getState().tray;
            const auth = options['auth'];
            const hash = options['hash'];
            /*
            if(!tray.tray.isLoading) return resolve({changed: false});
            */

            fetchPeriod(auth, hash)
            .then(list => {
                return resolve({changed: true, hash: hash, bars: list})
            })
            .catch(err => {
                return reject(err);
            })
            
        });
    }
)


export const traySlice = createSlice({
    name: 'tray',
    initialState: {
        tray: {
            list: {},
            isLoading: true,
        },
        periods: {},
        courses: {},
        selected: []
    },
    reducers: {},
    extraReducers: {
        [getTrayList.fulfilled]: (state, action) => {
            if(!action.payload.changed) {
                return;
            }

            const schools = action.payload['periods'];
            
            Object.keys(schools).forEach(school => {
                schools[school].forEach((period, i) => {
                    if(!state.tray.list[school]) state.tray.list[school] = [];
                    state.tray.list[school].push({name: period.name, hash: period.href});

                    state.periods[period.href] = {
                        school: school,
                        name: period.name,
                        isLoading: true,
                        index: i,
                        bars: []
                    }
                })
            });

            state.tray.isLoading = false;
        },
        [getTrayList.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
            state.isLoading = false;
        },
        [getPeriod.fulfilled]: (state, action) => {
            const hash = action.payload['hash'];
            if(!action.payload.changed) {
                return;
            }

            const bars = action.payload['bars'];
            bars.forEach(bar => {
                state.periods[hash] = {...state.periods[hash], ...{
                    bars: [...state.periods[hash].bars, {
                        name: bar.title,
                        courses: bar.courses.map(course => {
                            const isSelected = course.class.includes('on');

                            if(isSelected && !state.selected.includes(course.hash)) state.selected.push(course.hash); 

                            state.courses[course.hash] = {...course, isLoading: true, isSelected: isSelected}; 
                            return course.hash;
                        })
                    }],
                    isLoading: false
                }}
            })
        },
        [getPeriod.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
            state.isLoading = false;
        },
    },
});

export const useTray = (state) => ({
    tray: state.tray.tray,
    periods: state.tray.periods,
    courses: state.tray.courses,
    selected: state.tray.selected,
});

export default traySlice.reducer;
