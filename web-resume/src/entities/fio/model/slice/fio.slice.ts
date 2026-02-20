import type {FIO} from '../type/fio.type';
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../../../../app/providers/store/Store.ts";

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
    setPhoto(state: RootState, action:PayloadAction<string >) {
       state.photoUrl = action.payload;
    },
    setFirstName(state: RootState, action:PayloadAction<string>) {
      state.firstName = action.payload;
    },
    setLastName(state: RootState, action:PayloadAction<string>) {
      state.lastName = action.payload;
    },
    setFatherName(state: RootState, action:PayloadAction<string>) {
      state.fatherName = action.payload;
    }
  }
})

export const {setPhoto, setFirstName, setLastName, setFatherName} = fioSlice.actions;
export default fioSlice.reducer;