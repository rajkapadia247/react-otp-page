import type { KeyboardEvent, RefObject } from "react";

export type OTPChar =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "";
export type OTPType = OTPChar[];

export enum MOVE_DIRECTION {
  PREVIOUS,
  NEXT,
}

export type HandlePasteType = (
  event: React.ClipboardEvent<HTMLInputElement>,
  setOtp: (v: OTPType) => void,
  otpLength: number,
  submitOtp: (otp: string) => void
) => void;

export type HandleKeyPressType = (
  event: KeyboardEvent<HTMLInputElement>,
  index: number,
  otp: OTPType,
  setOtp: (v: OTPType) => void,
  inputRefArr: RefObject<HTMLInputElement[]>,
  setIsError: (isError: boolean) => void,
  setIsSuccess: (isSuccess: boolean) => void,
  submitOtp: (otp: string) => void
) => void;

export type MoveToType = (
  direction: MOVE_DIRECTION,
  index: number,
  inputRefArr: RefObject<HTMLInputElement[]>
) => void;
