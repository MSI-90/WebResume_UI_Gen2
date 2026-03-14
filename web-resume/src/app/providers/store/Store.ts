import {combineReducers, configureStore} from "@reduxjs/toolkit";
import resumeFlow from '@features/resume-builder/model/resumeFlow.slice';
import fio from '@entities/resume/fio/model/slice/fio.slice';
import social from '@entities/resume/social-network/model/social.slice.ts';
import contact from '@entities/resume/contact/model/slice/contact.slice';
import goal from '@entities/resume/goal/model/goal.slice';

// RTK Query import
import {socialApi} from "@entities/resume/social-network/api/socialApi.ts";
import {currencyApi} from "@shared/api/currency/api/currencyAPI.ts";
import {employmentApi} from "@shared/api/employnment-type/api/employmentAPI.ts";

const rootReducers = combineReducers({
  resumeFlow: resumeFlow,
  fio: fio,
  contact: contact,
  social: social,
  goal: goal,
  [socialApi.reducerPath]: socialApi.reducer,
  [currencyApi.reducerPath]: currencyApi.reducer,
  [employmentApi.reducerPath]: employmentApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(socialApi.middleware)
        .concat(currencyApi.middleware)
        .concat(employmentApi.middleware)
  });
}

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];