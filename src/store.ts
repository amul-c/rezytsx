import { configureStore } from '@reduxjs/toolkit';
import screenSizeReducer from './components/Slices/ScreenSizeSlice';

const store = configureStore({
  reducer: {
    screenSize: screenSizeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
