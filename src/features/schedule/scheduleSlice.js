import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchSchedule
} from '../../requests/wilma-api';


export const getWeek = createAsyncThunk(
    'schdule/getWeek',
    async (options, thunkAPI) => {
        const auth = options['auth'];
        const date = options['date'] ? options['date'] : (new Date());
        
        const response = await fetchSchedule(auth, date);
        return response
    }
)

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        schedule: {},
        isLoading: false,
    },
    reducers: {},
    extraReducers: {
        [getWeek.fulfilled]: (state, action) => {
            state.schedule = action.payload;
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
    isLoading: state.schedule.isLoading,
});

export default scheduleSlice.reducer;
