import type {RootState} from "@app/providers/store/Store";
import {createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {GoalState} from "@entities/resume/goal/type/goal";

const selectSelf = (state:RootState) => state;

export const goalSelector = createSelector(
  selectSelf,
  (state:RootState) => state.goal
);

const initialState: GoalState = {
  purposeResume: ''
}

const goalSlice = createSlice({
  name: 'goal',
  initialState: initialState,
  reducers: {
    setPurposeResume: (state:GoalState, action: PayloadAction<string>) => {
      state.purposeResume = action.payload;
    }
  }
})

export const {setPurposeResume} = goalSlice.actions;
export default goalSlice.reducer;