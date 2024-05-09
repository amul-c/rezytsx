import { createSlice } from '@reduxjs/toolkit';

interface ScreenSizeState {
  isSmallScreen: boolean;
  isLargeScreen: boolean;
}

const initialState: ScreenSizeState = {
  isSmallScreen: false,
  isLargeScreen: false,
};

const screenSizeSlice = createSlice({
  name: 'screenSize',
  initialState,
  reducers: {
    setSmallScreen(state) {
      state.isSmallScreen = true;
      state.isLargeScreen = false;
    },
    setLargeScreen(state) {
      state.isSmallScreen = false;
      state.isLargeScreen = true;
    },
  },
});

export const { setSmallScreen, setLargeScreen } = screenSizeSlice.actions;

export default screenSizeSlice.reducer;
