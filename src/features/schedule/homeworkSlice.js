import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchHomeworkGroups
} from '../../requests/wilma-api';

export const getGroups = createAsyncThunk(
    'homework/getGroups',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {

            const auth = options['auth'];

            fetchHomeworkGroups(auth)
            .then(groups => {
                return resolve({changed: true, groups: groups});
            })
            .catch(err => {
                return reject(err);
            })
            
        });
    }
)

export const homeworkSlice = createSlice({
    name: 'homework',
    initialState: {
        groups: [],
        isLoading: false
    },
    reducers: {},
    extraReducers: {
        [getGroups.fulfilled]: (state, action) => {
            if(!action.payload.changed) {
                return;
            }
            
            state.groups = action.payload['groups'];
            state.isLoading = false;
        },
        [getGroups.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
            state.isLoading = false;
        },
        [getGroups.pending]: (state, action) => {
            state.isLoading = true;
        }
    },
});



export const useHomework = (state) => ({
    groups: state.homework.groups,
    isLoading: state.homework.isLoading,
});

export default homeworkSlice.reducer;
