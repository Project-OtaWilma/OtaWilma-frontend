import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authentication/authSlice';
import configSlice from '../features/themes/configSlice';
import themeSlice from '../features/themes/themeSlice';
import messageSlice from '../features/messages/messageSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    config: configSlice,
    themes: themeSlice,
    messages: messageSlice
  },
});
