import {combineReducers, configureStore} from "@reduxjs/toolkit";
import resumeFlow from '@features/resume-builder/model/resumeFlow.slice';
import fio from '@entities/fio/model/slice/fio.slice';
import social from '@entities/social-network/model/social.slice.ts';
import contact from '@entities/contact/model/slice/contact.slice';

// RTK Query import
import {socialApi} from "@entities/social-network/api/socialApi.ts";

const rootReducers = combineReducers({
  resumeFlow: resumeFlow,
  fio: fio,
  contact: contact,
  social: social,
  [socialApi.reducerPath]: socialApi.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socialApi.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];