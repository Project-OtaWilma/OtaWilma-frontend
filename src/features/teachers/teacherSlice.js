import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchTeacherList,
    fetchTeacherInfo
} from '../../requests/wilma-api';

export const getTeachers = createAsyncThunk(
    'teachers/getTeachers',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const teachers = thunkAPI.getState().teachers;

            if(!teachers.list.isLoading) return resolve({changed: false})
            
            fetchTeacherList() 
            .then(list => {
                return resolve({changed: true, teachers: list});
            })
            .catch(err => {
                return reject(err);
            })
            
        });
    }
)

export const getTeacher = createAsyncThunk(
    'teachers/getTeacher',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const teachers = thunkAPI.getState().teachers;
            const name = options['name'];

            if(!teachers.teachers[name].isLoading) return resolve({changed: false})

            fetchTeacherInfo(name, false)
            .then(teacher => {
                return resolve({changed: true, teacher: teacher});
            })
            .catch(err => {
                return reject(err);
            })
            
        });
    }
)

export const teacherSlice = createSlice({
    name: 'teachers',
    initialState: {
        list: {
            content: {},
            isLoading: true
        },
        teachers: {}
    },
    reducers: {},
    extraReducers: {
        [getTeachers.fulfilled]: (state, action) => {
            if(!action.payload.changed) {
                return;
            }

            const teachers = action.payload['teachers'];

            Object.keys(teachers).forEach(l => teachers[l].forEach(teacher => {state.teachers[teacher.name] = {...teacher, isLoading: true}}))
            
            state.list.content = teachers;
            state.list.isLoading = false;
        },
        [getTeachers.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
            state.isLoading = false;
        },
        [getTeacher.fulfilled]: (state, action) => {
            if(!action.payload.changed) {
                return;
            }
            const teacher = action.payload['teacher'];

            state.teachers[teacher.name] = {...state.teachers[teacher.name], ...teacher, ...{isLoading: false}}
        },
        [getTeacher.rejected]: (state, action) => {
            console.log(action);
            console.log('api call rejected');
            state.isLoading = false;
        }
    },
});



export const useTeachers = (state) => ({
    list: state.teachers.list,
    teachers: state.teachers.teachers
});

export default teacherSlice.reducer;
