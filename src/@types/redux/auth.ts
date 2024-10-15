import { OtpReasons } from '../opportunity/auth/verify';

export enum RegisterStepsEnum {
  Email = 'EMAIL',
  OTP = 'OTP',
  Data = 'DATA',
}

export enum ResetPasswordStepsEnum {
  Email = 'EMAIL',
  OTP = 'OTP',
  Password = 'PASSWORD',
}

export interface AuthState {
  sessionCode: string;
  registerEmail: string;
  registerStep: RegisterStepsEnum;
  resetPasswordEmail: string;
  resetPasswordStep: ResetPasswordStepsEnum;
}

export type LoginValuesType = {
  phone: string;
  password: string;
  remember: boolean;
};

export type OtpValuesType = {
  reason: OtpReasons | null;
  token: string;
  coolDown: number;
};

// --------------- Payloads ---------------
export type OtpReasonChangedPayload = OtpReasons;
export type LoginValuesChangedPayload = LoginValuesType;
export type OtpValuesChangedPayload = OtpValuesType;
export type ExchangeCodeChangedPayload = string;
