import { createReducer } from '@reduxjs/toolkit';

import { AuthorizationStatus } from '../../const';
import { setAuthorizationStatus, setUserInfo } from './action';
import { UserAuth } from '../../types/user-auth';

const initialState: {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserAuth | null;
} = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});
