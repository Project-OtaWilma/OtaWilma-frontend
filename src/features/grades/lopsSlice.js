import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fectchCourseList,
    fetchCourse
} from '../../requests/wilma-api';
import { handleError } from '../errors/errorSlice';


export const getLops = createAsyncThunk(
    'lopsSlice/getLops',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const lops = thunkAPI.getState().lops;
            const current = options['lops'];

            if(lops['lops'][current].hasLoaded) return resolve({changed: false, lops: current});
            
            fectchCourseList(current)
            .then(list => {
                return resolve({changed: true, lops: current, courses: list});
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return reject();
            })
        });
    }
)

export const getCourse = createAsyncThunk(
    'lopsSlice/getCourseLops',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const lops = thunkAPI.getState().lops;
            const current = options['lops'];
            const subject = options['subject'];
            const code = options['code'];

            const course = lops.lops[current]['content'][subject][code];

            if(course.hasLoaded) return resolve({changed: false});
            
            fetchCourse(current, code)
            .then(info => {
                return resolve({changed: true, lops: current, course: {...course, ...info}});
            })
            .catch(err => {
                thunkAPI.dispatch(handleError(err))
                return reject();
            })
        });
    }
)

export const lopsSlice = createSlice({
    name: 'lops',
    initialState: {
        lops: {
            'LOPS2021': {
                isLoading: true,
                hasLoaded: false,
                content: {}
            },
            'LOPS2016': {
                isLoading: true,
                hasLoaded: false,
                content: {}
            }
        }
    },
    reducers: {
        getCourse: (state, action) => {
            const code = action.payload['code'];
            state.current = code;
            console.log(state.current);
            return state
        }
    },
    extraReducers: {
        [getLops.fulfilled]: (state, action) => {
            const lops = action.payload['lops'];
            if(!action.payload.changed) {
                state.lops[lops].isLoading = false;
                return;
            };

            const courses = action.payload['courses'];
            Object.keys(courses).map(subject => Object.keys(courses[subject]).map(code => courses[subject][code] = {...courses[subject][code], ...{hasLoaded: false}}));

            state.lops[lops].content = courses;
            state.lops[lops].isLoading = false;
            state.lops[lops].hasLoaded = true;
        },
        [getLops.rejected]: (state, action) => {

        },
        [getCourse.fulfilled]: (state, action) => {
            const lops = action.payload['lops'];
            if(!action.payload.changed) {
                return;
            }
            
            const course = action.payload['course'];

            course.hasLoaded = true;
            state.lops[lops]['content'][course.subject][course.code] = course;
        },
        [getCourse.rejected]: (state, action) => {
            
        }
    },
});

export const useLops = (state) => ({
    lops: state.lops.lops,
});

export default lopsSlice.reducer;
