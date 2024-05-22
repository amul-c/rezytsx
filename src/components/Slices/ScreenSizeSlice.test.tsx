import screenSizeReducer, {
  setSmallScreen,
  setLargeScreen,
} from "../Slices/ScreenSizeSlice";

describe("screenSizeSlice reducer", () => {
  it("should handle setSmallScreen", () => {
    const newState = screenSizeReducer(undefined, setSmallScreen());
    expect(newState.isSmallScreen).toBe(true);
    expect(newState.isLargeScreen).toBe(false);
  });

  it("should handle setLargeScreen", () => {
    const newState = screenSizeReducer(undefined, setLargeScreen());
    expect(newState.isSmallScreen).toBe(false);
    expect(newState.isLargeScreen).toBe(true);
  });

  it("should return the initial state when given an unknown action", () => {
    const initialState = { isSmallScreen: false, isLargeScreen: false };
    const newState = screenSizeReducer(initialState, {
      type: "UNKNOWN_ACTION",
    });
    expect(newState).toEqual(initialState);
  });

  it("should not mutate the state", () => {
    const initialState = { isSmallScreen: false, isLargeScreen: false };
    const state = screenSizeReducer(initialState, { type: "UNKNOWN_ACTION" });
    expect(state).toEqual(initialState);
    expect(state.isSmallScreen).toBe(initialState.isSmallScreen);
    expect(state.isLargeScreen).toBe(initialState.isLargeScreen);
  });
});
