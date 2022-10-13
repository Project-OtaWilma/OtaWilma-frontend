import { configureStore } from '@reduxjs/toolkit';
import studiesSlice from '../features/studies/StudiesSlice';

export default configureStore({
  reducer: {
    studies: studiesSlice
  },
});
