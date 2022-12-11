import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchRoomList, fetchRoomSchedule
} from '../../requests/wilma-api';

import { handleError } from '../errors/errorSlice';


export const getRoomList = createAsyncThunk(
    'rooms/getRoomList',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const rooms = thunkAPI.getState().rooms;
            const auth = options['auth'];

            if(!rooms.list.isLoading) return resolve({ changed: false });

            fetchRoomList(auth)
            .then(list => {
                return resolve({changed: true, list: list});
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return reject();
            })
            
        });
    }
)

export const getRoomScheduleWeek = createAsyncThunk(
    'rooms/getRoomScheduleWeek',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const rooms = thunkAPI.getState().rooms;

            const auth = options['auth'];
            const room = options['room'];
            const date = options['date'] ? options['date'] : (new Date());


            /*
            const raw = date.toLocaleDateString('fi-FI', options);

            const cached = Object.keys(schedule).find(week => schedule[week].range.includes(raw));

            if(cached) return resolve({changed: false, date: cached});
            */
            fetchRoomSchedule(auth, room, date)
            .then(schedule => {
                return resolve({changed: true, schedule: schedule});
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return reject();
            })
            
        });
    }
)

export const roomSlice = createSlice({
    name: 'rooms',
    initialState: {
        rooms: {},
        list: {
            content: [],
            isLoading: true,
        }
    },
    reducers: {},
    extraReducers: {
        [getRoomList.fulfilled]: (state, action) => {
            if(!action.payload.changed) {
                return;
            }
            const list = action.payload['list'];

            state.list['content'] = list.map(room => {state.rooms[room['roomNumber']] = {...room, isLoading: true}; return room.roomNumber});
            state.list.isLoading = false;
        },
        [getRoomList.rejected]: (state, action) => {
            console.log(action);
        },
        [getRoomScheduleWeek.fulfilled]: (state, action) => {
            if(!action.payload.changed) {
                state.current = action.payload.date;
                return;
            }

            const schedule = action.payload['schedule'];
            const roomNumber = schedule['roomNumber'];

            state.rooms[roomNumber] = {...state.rooms[roomNumber], ...{
                name: schedule.name,
                isLoading: false,
                week: schedule.week,
                days: schedule.days
            }}
        },
        [getRoomScheduleWeek.rejected]: (state, action) => {
            console.log(action);
        }
    },
});

export const useRooms = (state) => ({
    rooms: state.rooms.rooms,
    list: state.rooms.list,
});

export default roomSlice.reducer;
