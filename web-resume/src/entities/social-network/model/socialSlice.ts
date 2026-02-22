import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import type {SocialNetwork} from "@entities/social-network/type/social.ts";
import type {RootState} from "@app/providers/store/Store";

const socialAdapter = createEntityAdapter<SocialNetwork>();

export const socialSelector = socialAdapter.getSelectors(
  (state:RootState) => state.social);

const initialState = socialAdapter.getInitialState({
  loading: false,
  error: false,
});

export const socialSlice = createSlice({
  name: 'social',
  initialState: initialState,
  reducers: {},
})

export default socialSlice.reducer;