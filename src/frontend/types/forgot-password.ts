export type forgetStep = 1 | 2 | 3;

export interface forgetState {
  step: forgetStep;
  email: string;
  otp: string;
}