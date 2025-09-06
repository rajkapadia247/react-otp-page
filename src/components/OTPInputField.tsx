import type { Dispatch, RefObject, FC } from "react";
import type { OTPType } from "../types";
import { handleFocus, handleKeyPress, handlePaste } from "../utils";

interface OTPInputFieldProps {
  index: number;
  otp: OTPType;
  setOtp: Dispatch<OTPType>;
  inputRefArr: RefObject<HTMLInputElement[]>;
  isError: boolean;
  isSuccess: boolean;
  setIsError: (isError: boolean) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  submitOtp: (otp: string) => void;
}

export const OTPInputField: FC<OTPInputFieldProps> = ({
  index,
  otp,
  setOtp,
  inputRefArr,
  isError,
  isSuccess,
  setIsError,
  setIsSuccess,
  submitOtp,
}) => {
  return (
    <input
      type="number"
      className={`otp-input ${isError ? "error" : ""} ${
        isSuccess ? "disabled" : ""
      }`}
      id={`otp-input-${index}`}
      disabled={isSuccess}
      onKeyDown={(e) => {
        handleKeyPress(
          e,
          index,
          otp,
          setOtp,
          inputRefArr,
          setIsError,
          setIsSuccess,
          submitOtp
        );
      }}
      ref={(el) => {
        inputRefArr.current[index] = el as HTMLInputElement;
      }}
      onFocus={handleFocus}
      value={otp[index]}
      onChange={(e) => {
        e.preventDefault();
      }}
      onPaste={(e) => {
        handlePaste(e, setOtp, otp.length, submitOtp);
      }}
    />
  );
};
