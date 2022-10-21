import { configureStore } from '@reduxjs/toolkit';
import studiesSlice from '../features/studies/StudiesSlice';
import authSlice from '../features/authentication/authSlice';
import configSlice from '../features/themes/configSlice';

export default configureStore({
  reducer: {
    studies: studiesSlice,
    auth: authSlice,
    config: configSlice
  },
});
