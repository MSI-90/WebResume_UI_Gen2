import {createDraftSafeSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {resumeFlowSteps} from './steps.config';
import type {RootState} from "@app/providers/store/Store";
import type {IResumeFlowState} from "@features/resume-builder/types/ResumeStep.ts";

const selectSelf = (state: RootState) => state;

export const resumeFlowSelector = createDraftSafeSelector(
  selectSelf,
  (state:RootState) => state.resumeFlow)

const initialState: IResumeFlowState = {
  currentFlowStep: 0,
  disabledNextStepButton: false,
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
    },
    nextStepStateDisabled: (state, action:PayloadAction<boolean>) => {
      state.disabledNextStepButton = action.payload
    }
  }
})

export const {previousStep, nextStep, nextStepStateDisabled} = resumeFlowSlice.actions;
export default resumeFlowSlice.reducer;