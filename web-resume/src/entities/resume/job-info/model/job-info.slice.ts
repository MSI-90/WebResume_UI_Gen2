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
}

const jobInfoSlice = createSlice({
  name: 'jobInfo',
  initialState: initialState,
  reducers: {
    setJobTitle: (state, action: PayloadAction<string>) => {
      state.jobTitle = action.payload;
    }
  }
})

export const {setJobTitle} = jobInfoSlice.actions;
export default jobInfoSlice.reducer;