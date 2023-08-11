import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchAbsences
} from '../../requests/wilma-api';

export const getAbsences = createAsyncThunk(
    'absences/getAbsences',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {

            const auth = options['auth'];
            const date = options['date'] ?? new Date();

            fetchAbsences(auth, date)
            .then(async (list) => {
                return resolve({ changed: true, map: list, year: date.getFullYear() });
            })
            .catch(err => {
                return reject(err);
            })
            
        });
    }
)

export const absencesSlice = createSlice({
    name: 'absences',
    initialState: {
        map: {},
        isLoading: false
    },
    reducers: {},
    extraReducers: {
        [getAbsences.fulfilled]: (state, action) => {
            if(!action.payload.changed) {
                return;
            }

            const { map, year } = action.payload;

            state.map[year] = map;
            state.isLoading = false;
        },
        [getAbsences.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
            state.isLoading = false;
        },
        [getAbsences.pending]: (state, action) => {
            state.isLoading = true;
        }
    },
});



export const useAbsences = (state) => ({
    map: state.absences.map,
    isLoading: state.absences.isLoading,
});

export default absencesSlice.reducer;
