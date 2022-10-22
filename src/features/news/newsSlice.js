import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchNews
} from '../../requests/wilma-api';


export const getNews = createAsyncThunk(
    'news/getNews',
    async (options, thunkAPI) => {
        const auth = options['auth'];
        const path = options['path'];
        const limit = options['limit'] ? options['limit'] : 1000;
        
        const response = await fetchNews(auth, path, limit);
        response['path'] = path;
        return response
    }
)
export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news: {
            current: {
                isLoading: true,
                content: []
            },
            old: {
                isLoading: true,
                content: []
            },
            static: {
                isLoading: true,
                content: []
            }
        },
    },
    reducers: {},
    extraReducers: {
        [getNews.fulfilled]: (state, action) => {
            const path = action.payload['path'];
            delete action.payload['path'];

            switch(path) {
                case 'current':
                    Object.keys(action.payload).forEach(date => {action.payload[date] = action.payload[date].map(n => { return {...n, ...{isLoading: false, content: null}}}) })
                    break;
                default:
                    action.payload = action.payload.map(n => { return {...n, ...{isLoading: false, content: null}}})
                    break;
            }
            state.news[path] = action.payload;
        },
        [getNews.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
            state.isLoading = false;
        }
    },
});

export const useNews = (state) => ({
    news: state.news.news
});

export default newsSlice.reducer;
