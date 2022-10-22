import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchGradeBook
} from '../../requests/wilma-api';


export const getGradebook = createAsyncThunk(
    'grades/getGradebook',
    async (options, thunkAPI) => {
        const auth = options['auth'];
        
        const response = await fetchGradeBook(auth);
        return response
    }
)

export const gradeSlice = createSlice({
    name: 'grades',
    initialState: {
        grades: {},
        overview: {},
        isLoading: false,
    },
    reducers: {},
    extraReducers: {
        [getGradebook.fulfilled]: (state, action) => {
            state.overview = action.payload['overview'];
            delete action.payload['overview'];

            state.grades = action.payload;
            state.isLoading = false;
        },
        [getGradebook.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
            state.isLoading = false;
        },
        [getGradebook.pending]: (state, action) => {
            state.isLoading = true;
        }
    },
});

export const useGrades = (state) => ({
    grades: state.grades.grades,
    overview: state.grades.overview,
    isLoading: state.grades.isLoading,
});

export default gradeSlice.reducer;
