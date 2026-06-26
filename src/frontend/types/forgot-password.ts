export type ForgotStep = 1 | 2 | 3;

export interface ForgotState {
  step: ForgotStep;
  email: string;
  otp: string;
}