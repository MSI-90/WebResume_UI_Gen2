import {createDraftSafeSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ResumeSocialNetwork} from "@entities/social-network/type/social.ts";
import type {RootState} from "@app/providers/store/Store";

const selectSelf = (state:RootState) => state;

export const socialSelector = createDraftSafeSelector(
  selectSelf,
  (state:RootState) => state.social
)

const initialState: ResumeSocialNetwork = {
  SocialNetwork: {
    SocialType: 0,
    SocialLink: ''
  }
};

const socialSlice = createSlice({
  name: 'social',
  initialState: initialState,
  reducers: {
    setSocialType(state, action:PayloadAction<number>){
        state.SocialNetwork.SocialType = action.payload;
    },
    setSocialLink(state, action:PayloadAction<string>){
      state.SocialNetwork.SocialLink = action.payload;
    }
  },
})

export const {setSocialType, setSocialLink} = socialSlice.actions;
export default socialSlice.reducer;