import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { resetSession} from '../authentication/authSlice';

export const handleError = createAsyncThunk(
    'errors/handleError',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            console.log(options);
            if(options.redirect) {
                thunkAPI.dispatch(resetSession());
                return resolve();
            }
                
            
        });
    }
)

export const errorSlice = createSlice({
    name: 'errors',
    initialState: {
        error: {}
    },
    reducers: {

    },
    extraReducers: {
        [handleError.fulfilled]: (state, action) => {
            //
        }
    },
});

export const useErrors = (state) => ({
    error: state.errors.error,
});

export default errorSlice.reducer;
