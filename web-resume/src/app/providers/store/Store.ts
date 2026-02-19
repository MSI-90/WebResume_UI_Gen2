import {combineReducers, configureStore} from "@reduxjs/toolkit";
import resumeFlow from '@features/resume-builder/model/resumeFlow.slice';

const rootReducers = combineReducers({
  resumeFlow: resumeFlow
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers,
  });
}

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];