import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fectchCourseList
} from '../../requests/wilma-api';


export const getLops = createAsyncThunk(
    'lopsSlice/getLops',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const lops = thunkAPI.getState().lops;
            const current = options['lops'];

            if(lops['lops'][current].hasLoaded) return resolve({changed: false, lops: current});
            
            fectchCourseList(current)
            .then(list => {
                return resolve({changed: true, lops: current, courses: list});
            })
            .catch(err => {
                return reject(err);
            })
        });
    }
)

export const lopsSlice = createSlice({
    name: 'lops',
    initialState: {
        lops: {
            'LOPS2021': {
                isLoading: true,
                hasLoaded: false,
                content: {}
            },
            'LOPS2016': {
                isLoading: true,
                hasLoaded: false,
                content: {}
            }
        }
    },
    reducers: {},
    extraReducers: {
        [getLops.fulfilled]: (state, action) => {
            const lops = action.payload['lops'];
            if(!action.payload.changed) {
                state.lops[lops].isLoading = false;
                return;
            };
            
            state.lops[lops].content = action.payload['courses'];
            state.lops[lops].isLoading = false;
            state.lops[lops].hasLoaded = true;
        },
        [getLops.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
        }
    },
});

export const useLops = (state) => ({
    lops: state.lops.lops,
});

export default lopsSlice.reducer;
