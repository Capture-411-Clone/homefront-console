import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthState,
  ExchangeCodeChangedPayload,
  RegisterStepsEnum,
  ResetPasswordStepsEnum,
} from 'src/@types/redux/auth';

import { RootState } from '../store';
// utils

// ----------------------------------------------------------------------

const initialState: AuthState = {
  resetPasswordEmail: '',
  registerEmail: '',
  sessionCode: '',
  registerStep: RegisterStepsEnum.Email,
  resetPasswordStep: ResetPasswordStepsEnum.Email,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetPasswordEmailChanged: (state, action: PayloadAction<string>) => {
      state.resetPasswordEmail = action.payload;
    },
    registerEmailChanged: (state, action: PayloadAction<string>) => {
      state.registerEmail = action.payload;
    },
    exchangeCodeChanged: (state, action: PayloadAction<ExchangeCodeChangedPayload>) => {
      state.sessionCode = action.payload;
    },
    registerStepChanged: (state, action: PayloadAction<RegisterStepsEnum>) => {
      state.registerStep = action.payload;
    },
    resetPasswordStepChanged: (state, action: PayloadAction<ResetPasswordStepsEnum>) => {
      state.resetPasswordStep = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Selectors
export const sessionCodeSelector = (state: RootState) => state.auth.sessionCode;
export const registerStepSelector = (state: RootState) => state.auth.registerStep;
export const resetPasswordStepSelector = (state: RootState) => state.auth.resetPasswordStep;
export const registerEmailSelector = (state: RootState) => state.auth.registerEmail;
export const resetPasswordEmailSelector = (state: RootState) => state.auth.resetPasswordEmail;

// Actions
export const {
  registerEmailChanged,
  resetPasswordEmailChanged,
  exchangeCodeChanged,
  registerStepChanged,
  resetPasswordStepChanged,
} = slice.actions;
