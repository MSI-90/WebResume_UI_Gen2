import {createDraftSafeSelector, createSlice} from "@reduxjs/toolkit";
import {resumeFlowSteps} from './steps.config';
import type {RootState} from "../../../app/providers/store/Store.ts";

const selectSelf = (state: RootState) => state

export const resumeFlowSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state.resumeFlow)

const initialState = {
  currentFlowStep: 0
}

export const resumeFlowSlice = createSlice({
  name: 'resumeFlow',
  initialState: initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentFlowStep < resumeFlowSteps.length - 1) {
        state.currentFlowStep += 1;
        return state;
      }
    },
    previousStep: (state) => {
      if (state.currentFlowStep >= 1) {
        state.currentFlowStep -= 1;
      }
    }
  }
})

export const {previousStep, nextStep} = resumeFlowSlice.actions;
export default resumeFlowSlice.reducer;