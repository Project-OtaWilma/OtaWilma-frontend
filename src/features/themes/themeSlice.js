import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchTheme,
    fetchDefaultTheme,
} from '../../requests/theme-api';


export const getTheme = createAsyncThunk(
    'themes/getTheme',
    async (options, thunkAPI) => {
        console.log(options);
        const auth = options['auth'];
        const id = options['id'];
        const response = await fetchTheme(auth, id)
        return response
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
            if(Object.keys(themes['themes']).includes(id)) return resolve({changed: false, theme: themes['themes'][id]});

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
            if(Object.keys(themes['themes']).includes(id)) return resolve({changed: false, theme: themes['themes'][id]});

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


export const themeSlice = createSlice({
    name: 'themes',
    initialState: {
        current: null,
        themes: {},
        isInitialized: false,
    },
    reducers: {},
    extraReducers: {
        [getTheme.fulfilled]: (state, action) => {
            const hash = action.payload['hash'];
            state.themes[hash] = action.payload;
        },
        [getTheme.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
        },
        [loadTheme.fulfilled]: (state, action) => {
            const hash = action.payload['theme']['hash'];
            if (action.payload.changed) state.themes[hash] = action.payload['theme'];

            state.current = hash;
            state.isInitialized = true;
        },
        [loadTheme.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
        },
        [loadThemeDefault.fulfilled]: (state, action) => {
            const hash = action.payload['theme']['hash'];
            if (action.payload.changed) state.themes[hash] = action.payload['theme'];

            state.current = hash;
            state.isInitialized = true;
        },
        [loadThemeDefault.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
        },
    },
});

export const useThemes = (state) => ({
    value: state.themes.themes,
    current: state.themes.current,
    isInitialized: state.themes.isInitialized
});

export default themeSlice.reducer;
