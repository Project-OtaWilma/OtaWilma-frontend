import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchStudiesTrending
} from '../../requests/studies';


export const fetchTrending = createAsyncThunk(
    'studies/fetchTrending',
    async (data, thunkAPI) => {
        const response = await fetchStudiesTrending()
        return response
    }
)

export const studiesSlice = createSlice({
    name: 'studies',
    initialState: {
        studies: ['test'],
        isLoading: false,
        hasLoaded: false
    },
    reducers: {},
    extraReducers: {
        [fetchTrending.fulfilled]: (state, action) => {
            state.studies = action.payload;
            state.isLoading = false;
            state.hasLoaded = true;
        },
        [fetchTrending.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
            state.isLoading = false;
        },
        [fetchTrending.pending]: (state, action) => {
            state.isLoading = true;
        },
    },
});

export const selectStudies = (state) => ({
    value: state.studies.studies,
    isLoading: state.studies.isLoading,
    hasLoaded: state.studies.hasLoaded
});

export default studiesSlice.reducer;
