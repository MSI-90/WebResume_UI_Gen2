import type {FIO} from '../type/fio.type';
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

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
    setPhoto(state, action:PayloadAction<string >) {
       state.photoUrl = action.payload;
    },
    setFirstName(state, action:PayloadAction<string>) {
      state.firstName = action.payload;
      console.log(state.firstName);
    },
    setLastName(state, action:PayloadAction<string>) {
      state.lastName = action.payload;
      console.log(state.lastName);
    },
    setFatherName(state, action:PayloadAction<string>) {
      state.fatherName = action.payload;
      console.log(state.fatherName);
    }
  }
})

export const {setPhoto, setFirstName, setLastName, setFatherName} = fioSlice.actions;
export default fioSlice.reducer;