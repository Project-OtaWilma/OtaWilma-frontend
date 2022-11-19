import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { resetSession} from '../authentication/authSlice';

export const handleError = createAsyncThunk(
    'errors/handleError',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            console.log(options);

            if(options.redirect) {
                thunkAPI.dispatch(resetSession());
                return resolve({handled: true});
            }
                
            return resolve({handled: false, err: options});
        });
    }
)

export const errorSlice = createSlice({
    name: 'errors',
    initialState: {
        error: {},
        fatal: false,
    },
    reducers: {

    },
    extraReducers: {
        [handleError.fulfilled]: (state, action) => {

            if(action.payload.handled) {
                return;
            }

            const error = action.payload['err'];
            state.error = error;
            state.fatal = true;
        }
    },
});

export const useErrors = (state) => ({
    error: state.errors.error,
    fatal: state.errors.fatal,
});

export default errorSlice.reducer;
