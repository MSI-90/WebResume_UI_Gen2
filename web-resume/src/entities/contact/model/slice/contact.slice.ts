import type {RootState} from "@app/providers/store/Store.ts";
import type {Contact} from "@entities/contact/type/contact.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export const contactSelector = (state:RootState) => state.contact;

const initialState: Contact = {
  phone: '+79997776655',
  email: 'example@email.ru'
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