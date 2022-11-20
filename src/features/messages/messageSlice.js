import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchMessages,
    fetchMessageContent
} from '../../requests/wilma-api';
import { handleError } from '../errors/errorSlice';

export const getMessages = createAsyncThunk(
    'messages/getMessages',
    async (options, thunkAPI) => {
        return new Promise((resolve, rejected) => {
            const messages = thunkAPI.getState().messages;
            const auth = options['auth'];
            const path = options['path'];
            const limit = options['limit'] ? options['limit'] : 1000;

            if(!messages.list[path].isLoading) return resolve({changed: false, path: path});
            
            fetchMessages(auth, path, limit)
            .then(list => {
                console.log(list);
                return resolve({changed: true, messages: list.slice(0, limit), path: path})
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return rejected();
            })
        });
    }
)

export const getMessage = createAsyncThunk(
    'messages/getMessage',
    async (options, thunkAPI) => {
        return new Promise((resolve, rejected) => {
            const messages = thunkAPI.getState().messages;
            const auth = options['auth'];
            const id = options['id'];
            
            if(messages.messages[id] && !messages.messages[id].isLoading) return resolve({changed: false, id: id})
            
            fetchMessageContent(auth, id)
            .then(list => {
                return resolve({changed: true, id: id, message: list[0]})
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return rejected();
            })
            
        });
    }
)

export const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        list: {
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
        messages: {}
    },
    reducers: {},
    extraReducers: {
        [getMessages.fulfilled]: (state, action) => {
            const path = action.payload['path'];
            if(!action.payload.changed) {
                state.list[path].isLoading = false;
                return;
            }

            state.list[path]['content'] = action.payload['messages'].map(m => {state.messages[m.id] = {...m, ...state.messages[m.id], ...{isLoading: state.messages[m.id] ? state.messages[m.id].isLoading : true}}; return m.id;});
            state.list[path].isLoading = false;
        },
        [getMessages.rejected]: (state, action) => {
            state.isLoading = false;
        },
        [getMessage.fulfilled]: (state, action) => {
            const id = action.payload['id'];
            if(!action.payload.changed) {
                return;
            }

            const message = action.payload['message'];

            state.messages[id] = {...state.messages[id], ...{
                content: message.content,
                replyList: message.replies,
                fromWilma: message.fromWilma,
                isLoading: false,
                new: false
            }}
        },
        [getMessage.rejected]: (state, action) => {
            console.log(action);
            state.isLoading = false;
        },
    },
});

export const useMessages = (state) => ({
    list: state.messages.list,
    messages: state.messages.messages
});

export default messageSlice.reducer;
