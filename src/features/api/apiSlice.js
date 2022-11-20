import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    publish,
    generateToken,
    listTokens,
    invalidateToken,
    useToken
} from '../../requests/theme-api';

import { handleError } from '../errors/errorSlice';
import { setPublicFlag } from '../themes/configSlice';


export const publishData = createAsyncThunk(
    'api/publishData',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const auth = options['auth'];
            
            publish(auth)
            .then(() => {
                // set local config 'public' flag
                thunkAPI.dispatch(setPublicFlag());
                return resolve();
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return reject();
            })
        });
    }
)

export const generateCode = createAsyncThunk(
    'api/generateCode',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const auth = options['auth'];
            
            generateToken(auth)
            .then(res => {
                return resolve({hash: res['hash']});
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return reject();
            })
        });
    }
)

export const getTokenList = createAsyncThunk(
    'api/getTokenList',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const api = thunkAPI.getState().api;
            const auth = options['auth'];

            if(!api.tokens.isLoading) return resolve({changed: false})

            listTokens(auth)
            .then(list => {
                return resolve({changed: true, list: list});
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return reject();
            })
        });
    }
)

export const removeCode = createAsyncThunk(
    'api/removeCode',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const auth = options['auth'];
            const hash = options['hash'];

            invalidateToken(auth, hash)
            .then(() => {
                return resolve({hash: hash});
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return reject();
            })
        });
    }
)

export const applyCode = createAsyncThunk(
    'api/applyCode',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const auth = options['auth'];
            const hash = options['hash'];

            useToken(auth, hash)
            .then(res => {
                return resolve({error: false, owner: res['owner']});
            })
            .catch(err => {
                return resolve({error: true, err: err})
                //thunkAPI.dispatch(handleError(err))
                //return reject();
            })
        });
    }
)

export const apiSlice = createSlice({
    name: 'api',
    initialState: {
        generated: null,
        status: {
            error: false,
            content: null
        },
        tokens: {
            isLoading: true,
            content: []
        },
        isPublishing: false,
        isGenerating: false,
    },
    reducers: {
        resetGenerated: (state, action) => {
            state.generated = null;
            return state;
        }
    },
    extraReducers: {
        [publishData.fulfilled]: (state, action) => {
            state.isPublishing = false;
        },
        [publishData.rejected]: (state, action) => {
            
            state.isPublishing = false;
        },
        [publishData.pending]: (state, action) => {
            
            state.isPublishing = true;
        },
        [generateCode.fulfilled]: (state, action) => {
            state.isGenerating = false;
            const hash = action.payload['hash'];

            state.generated = hash;
            state.tokens['content'].push({
                hash: hash,
                username: null,
                used: false
            })
        },
        [generateCode.rejected]: (state, action) => {
            state.isGenerating = false;
        },
        [generateCode.pending]: (state, action) => {
            state.isGenerating = true;
        },
        [getTokenList.fulfilled]: (state, action) => {
            if(!action.payload.changed) {
                return;
            }

            const list = action.payload['list'];
            state.tokens['content'] = [...state.tokens['content'], ...list]
            state.tokens.isLoading = false;
        },
        [getTokenList.rejected]: (state, action) => {
            //
        },
        [removeCode.fulfilled]: (state, action) => {
            const hash = action.payload['hash'];

            state.tokens['content'] = state.tokens['content'].filter(t => t['hash'] !== hash);
            state.tokens.isLoading = false;
        },
        [removeCode.pending]: (state, action) => {
            state.tokens.isLoading = true;
        },
        [applyCode.fulfilled]: (state, action) => {
            const errors = {
                'You have already access to this information': 'Sinulla on jo pääsy tämän käyttäjän kurssivalintoihin',
                'Invalid access-token': 'Virheellinen kaverikoodi'
            }
            console.log(action.payload);
            if(action.payload.error) {
                const error = action.payload.err;
                const message = error.error ? error.error.err : 'Tuntematon virhe';
                state.status['content'] = Object.keys(errors).includes(message) ? errors[message] : message;
                state.status.error = true;
                return;
            }

            const owner = action.payload['owner'];

            state.status['content'] = `Näet nyt käyttäjän "${owner}" kurssivalinnat`;
            console.log(state.status);
        },
        [applyCode.pending]: (state, action) => {
            state.status = {
                error: false,
                content: 'tarkistetaan...'
            }
        },
    },
});

export const useApi = (state) => ({
    selections: state.api.selections,
    tokens: state.api.tokens,
    friends: state.api.friends,
    isPublishing: state.api.isPublishing,
    generated: state.api.generated,
    status: state.api.status,
    isGenerating: state.api.isGenerating
});

export const { resetGenerated } = apiSlice.actions;

export default apiSlice.reducer;
