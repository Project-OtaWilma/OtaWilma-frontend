import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchTheme,
    fetchDefaultTheme,
    fetchThemeList,
    createTheme as fCreateTheme,
    deleteTheme,
    editThemeBackground,
    editThemeColors
} from '../../requests/theme-api';

/*
export const getTheme = createAsyncThunk(
    'themes/getTheme',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const themes = thunkAPI.getState().themes;
            const auth = options['auth'];
            const id = options['id'];

            if(themes[id]) return resolve({changed: false, theme: themes['themes'][id]});

            fetchTheme(auth, id)
            .then(theme => {
                return resolve({changed: true, theme: theme});
            })
            .catch(err => {
                return reject(err);
            })
        })
    }
)
*/

export const getThemeList = createAsyncThunk(
    'themes/getThemeList',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const themes = thunkAPI.getState().themes;
            const auth = options['auth'];

            //if(themes[id]) return resolve({changed: false, theme: themes['themes'][id]});

            fetchThemeList(auth)
            .then(list => {
                return resolve({changed: true, list: list});
            })
            .catch(err => {
                return reject(err);
            })
        })
    }
)

export const loadTheme = createAsyncThunk(
    'themes/loadTheme',
    async (options, thunkAPI) => {
        return await new Promise((resolve, reject) => {
            const themes = thunkAPI.getState().themes;
            const id = options['id'];
            const auth = options['auth'];
            
            // cache loaded themes
            if(themes[id] && !themes[id].isLoading) return resolve({changed: false, theme: themes['themes'][id]});

            fetchTheme(auth, id)
            .then(theme => {
                return resolve({changed: true, theme: theme});
            })
            .catch(err => {
                return reject(err);
            })
        });
    }
)

export const loadThemeDefault = createAsyncThunk(
    'themes/loadThemeDefault',
    async (options, thunkAPI) => {
        return await new Promise((resolve, reject) => {
            const themes = thunkAPI.getState().themes;
            const id = options['id'];
            
            // cache loaded themes
            if(themes[id] && !themes[id].isLoading) return resolve({changed: false, theme: themes['themes'][id]});

            fetchDefaultTheme(id)
            .then(theme => {
                return resolve({changed: true, theme: theme});
            })
            .catch(err => {
                return reject(err);
            })
        });
    }
)

export const createTheme = createAsyncThunk(
    'themes/createTheme',
    async (options, thunkAPI) => {
        return await new Promise((resolve, reject) => {
            const auth = options['auth'];
            const preset = options['preset'];

            
            fCreateTheme(auth, preset)
            .then(result => {
                return resolve({changed: true, theme: result['session'], preset: preset});
            })
            .catch(err => {
                return reject(err);
            })
            
        });
    }
)

export const themeSlice = createSlice({
    name: 'themes',
    initialState: {
        current: null,
        list: {
            isLoading: true,
            content: []
        },
        themes: {},
        isInitialized: false,
    },
    reducers: {
        setTheme: (state, action) => {
            const hash = action.payload['id'];
            state.current = hash;

            return state;
        }
    },
    extraReducers: {
        [getThemeList.fulfilled]: (state, action) => {
            console.log(action.payload);
            if(!action.payload.changed) {
                return;
            }

            const list = action.payload['list'];

            state.list['content'] = list.map(hash => {state.themes[hash] = state.themes[hash] ? state.themes[hash] : {isLoading: true, hash: hash}; return hash})
            state.list.isLoading = false;
        },
        [getThemeList.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
        },
        [loadTheme.fulfilled]: (state, action) => {
            const hash = action.payload['theme']['hash'];
            if(!action.payload.changed) {
                return;
            }
            
            const theme = action.payload['theme'];

            state.themes[hash] = {...theme, ...{isLoading: false}};
        },
        [loadTheme.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
        },
        [loadThemeDefault.fulfilled]: (state, action) => {
            const hash = action.payload['theme']['hash'];
            if(!action.payload.changed) {
                return;
            }

            const theme = action.payload['theme'];

            state.themes[hash] = {...theme, ...{isLoading: false}};
        },
        [loadThemeDefault.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
        },
        [createTheme.fulfilled]: (state, action) => {
            const hash = action.payload['theme']['hash'];
            if(!action.payload.changed) {
                return;
            }

            const preset = action.payload['preset'];

            state.list['content'].push(hash);
            state.themes[hash] = {...state.themes[preset], ...{hash: hash}};
        },
        [createTheme.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
        },
    },
});


export const { setTheme } = themeSlice.actions;

export const useThemes = (state) => ({
    themes: state.themes.themes,
    current: state.themes.current,
    theme: state.themes.themes[state.themes.current],
    list: state.themes.list
});


export default themeSlice.reducer;
