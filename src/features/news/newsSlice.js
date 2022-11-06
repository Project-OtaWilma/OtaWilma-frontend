import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchNews,
    fetchNewsContent
} from '../../requests/wilma-api';

import { handleError } from '../errors/errorSlice';

// generate random (0 - 25 000) id for news without id
export const newsHrefToHash = (raw) => raw ? Number.parseInt(raw.split('/').reverse()[0]) : Math.floor(Math.random() * 25000);

export const getNews = createAsyncThunk(
    'news/getNews',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const news = thunkAPI.getState().news;
            const auth = options['auth'];
            const path = options['path'];
            const limit = options['limit'] ? options['limit'] : 1000;

            if(!news.list[path].isLoading) return resolve({changed: false, path: path})
            
            fetchNews(auth, path, limit)
            .then(list => {
                return resolve({changed: true, path: path, news: list})
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return reject();
            })
        });
    }
)

export const getNewsContent = createAsyncThunk(
    'news/getNewsContent',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const news = thunkAPI.getState().news;
            const auth = options['auth'];
            const id = options['id'];

            if(news.news[id] && !news.news[id].isLoading) return resolve({changed: false, id: id})
            
            fetchNewsContent(auth, id)
            .then(news => {
                return resolve({changed: true, id: id, news: news})
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return reject();
            })
        });
    }
)


export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        list: {
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
        news: {}
    },
    reducers: {},
    extraReducers: {
        [getNews.fulfilled]: (state, action) => {
            const path = action.payload['path'];
            if(!action.payload.changed) {
                return;
            }

            const news = action.payload['news'];
            const p = newsHrefToHash; // shorten 'parser' to increase readibility
            
            switch(path) {
                case 'current':
                    state.list[path].content = Object.keys(news).map(date => news[date].map(n => {const id = p(n.href); state.news[id] = state.news[id] ? state.news[id] : {...n, ...{date: date, id: id, isLoading: true, isInvalid: !n.href}}; return id}) ).flat()
                    break;
                default:
                    state.list[path].content = news.map(n => {const id = p(n.href); state.news[id] = state.news[id] ? state.news[id] : {...n, ...{id: id, isLoading: true, isInvalid: !n.href}}; return id})
                    break;
            }

            state.list[path].isLoading = false;
        },
        [getNews.rejected]: (state, action) => {
            state.isLoading = false;
        },
        [getNewsContent.fulfilled]: (state, action) => {
            const id = action.payload['id'];
            if(!action.payload.changed) {
                return;
            }

            const news = action.payload['news'];

            state.news[id] = {...state.news[id], ...{
                content: news.html,
                isLoading: false
            }}
        },
        [getNewsContent.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
            state.isLoading = false;
        }
    },
});

export const useNews = (state) => ({
    list: state.news.list,
    news: state.news.news
});

export default newsSlice.reducer;
