import type {RootState} from "@app/providers/store/Store.ts";
import {createDraftSafeSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {JobInfoState} from "@entities/resume/job-info/types/job-info.types.ts";

const selectSelf = (state: RootState) => state;

export const draftSelector = createDraftSafeSelector(
  selectSelf,
  (state: RootState) => state.jobInfo
);

const initialState: JobInfoState = {
  jobTitle: '',
  amount: 0,
  currency: 810,
  employmentType: 0,
  workSchedule: 0,
}

const jobInfoSlice = createSlice({
  name: 'jobInfo',
  initialState: initialState,
  reducers: {
    setJobTitle: (state, action: PayloadAction<string>) => {
      state.jobTitle = action.payload;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setCurrency: (state, action: PayloadAction<number>) => {
      state.currency = action.payload;
    },
    setEmploymentType: (state, action: PayloadAction<number>) => {
      state.employmentType = action.payload;
    },
    setWorkSchedule: (state, action: PayloadAction<number>) => {
      state.workSchedule = action.payload;
    }
  }
})

export const {setJobTitle, setAmount, setCurrency, setEmploymentType, setWorkSchedule} = jobInfoSlice.actions;
export default jobInfoSlice.reducer;