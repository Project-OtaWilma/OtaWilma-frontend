import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchMessages
} from '../../requests/wilma-api';


export const getMessages = createAsyncThunk(
    'messages/getMessages',
    async (options, thunkAPI) => {
        const auth = options['auth'];
        const path = options['path'];
        const limit = options['limit'] ? options['limit'] : 1000;
        
        const response = await fetchMessages(auth, path, limit);
        response['path'] = path;
        return response
    }
)

export const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: {
            inbox: {
                isLoading: true,
                content: []
            },
            outbox: {
                isLoading: true,
                content: []
            },
            appointments: {
                isLoading: true,
                content: []
            }
        },
        isLoading: false
    },
    reducers: {},
    extraReducers: {
        [getMessages.fulfilled]: (state, action) => {
            const path = action.payload['path'];
            state.messages[path] = {
                isLoading: false,
                content: action.payload.map(message =>{ return {...message, ...{isLoading: false, content: null}}}).slice(1, 10)
            };
            state.isLoading = false;
        },
        [getMessages.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
            state.isLoading = false;
        },
    },
});

export const useMessages = (state) => ({
    messages: state.messages.messages,
    isLoading: state.messages.isLoading,
});

export default messageSlice.reducer;
