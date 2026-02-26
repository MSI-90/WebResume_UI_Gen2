import type {RootState} from "@app/providers/store/Store.ts";
import type {Contact} from "@entities/contact/type/contact.ts";
import {createDraftSafeSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";

const selectSelf = (state:RootState) => state;
export const contactSelector = createDraftSafeSelector(
  selectSelf,
  (state: RootState) => state.contact
);

const initialState: Contact = {
  phone: '',
  email: ''
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState: initialState,
  reducers: {
    setPhone: (state, action:PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setEmail: (state, action:PayloadAction<string>) => {
      state.email = action.payload;
    }
  }
})

export const {setPhone, setEmail} = contactSlice.actions;
export default contactSlice.reducer;