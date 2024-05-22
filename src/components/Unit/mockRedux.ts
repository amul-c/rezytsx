import { RootState } from '../../store'; 

export const useSelectorMock = jest.fn();

const mockState: RootState = {
  screenSize: {
    isSmallScreen: false,
    isLargeScreen: true,
  },
};

useSelectorMock.mockReturnValue(mockState);
