import type {FIO} from '../type/fio.type';
import {createDraftSafeSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@app/providers/store/Store.ts";

const selectSelf = (state:RootState) => state;
export const fioSelector = createDraftSafeSelector(
  selectSelf,
  (state:RootState) => state.fio
)

const initialState: FIO = {
  firstName: '',
  lastName: '',
  fatherName: '',
  photoUrl: ''
}

export const fioSlice = createSlice({
  name: 'fio',
  initialState: initialState,
  reducers: {
    /*После реализации отправки запросов переделать на путь presignedLink от s3 хранилища*/
    setPhoto(state, action:PayloadAction<string>) {
        state.photoUrl = action.payload;
    },
    setFirstName(state, action:PayloadAction<string>) {
      state.firstName = action.payload;
    },
    setLastName(state, action:PayloadAction<string>) {
      state.lastName = action.payload;
    },
    setFatherName(state, action:PayloadAction<string>) {
      state.fatherName = action.payload;
    }
  }
})

export const {setPhoto, setFirstName, setLastName, setFatherName} = fioSlice.actions;
export default fioSlice.reducer;