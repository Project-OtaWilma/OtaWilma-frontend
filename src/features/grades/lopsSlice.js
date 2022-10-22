import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fectchCourseList
} from '../../requests/wilma-api';


export const getLops = createAsyncThunk(
    'lopsSlice/getLops',
    async (options, thunkAPI) => {
        const lops = options['lops'];
        
        const response = await fectchCourseList(lops);
        response['lops'] = lops;
        return response
    }
)

export const lopsSlice = createSlice({
    name: 'lops',
    initialState: {
        lops: {
            'LOPS2021': {
                isLoading: true,
                content: {}
            },
            'LOPS2016': {
                isLoading: true,
                content: {}
            }
        }
    },
    reducers: {},
    extraReducers: {
        [getLops.fulfilled]: (state, action) => {
            const lops = action.payload['lops'];
            delete action.payload['lops'];
            state.lops[lops].content = action.payload;
            state.lops[lops].isLoading = false;
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
