import {
  MOVE_DIRECTION,
  type HandleKeyPressType,
  type HandlePasteType,
  type MoveToType,
  type OTPChar,
  type OTPType,
} from "./types";

export const isOTPValid = (otp: OTPType): boolean => {
  return otp.every((char) => /^\d$/.test(char));
};

export const joinOTP = (otp: OTPType) => {
  return otp.map((char) => (char ? char : "-")).join("");
};

export const handlePaste: HandlePasteType = (
  e,
  setOtp,
  otpLength,
  submitOtp
) => {
  const data: string = e.clipboardData.getData("text");
  if (/^\d{1,}$/.test(data)) {
    const otpToBePasted: OTPType = new Array(otpLength).fill("");
    otpToBePasted.forEach((_, idx) => {
      if (idx < otpLength) {
        otpToBePasted[idx] = data[idx] as OTPChar;
      }
    });
    setOtp(otpToBePasted);
    if (data.length >= otpLength) submitOtp(joinOTP(otpToBePasted));
  }
};

export const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.select();
};

export const selectInputField = (el: HTMLInputElement) => {
  setTimeout(() => {
    el.select();
  }, 0);
};

export const moveTo: MoveToType = (direction, idx, inputRefArr) => {
  if (direction === MOVE_DIRECTION.NEXT) {
    if (idx !== inputRefArr.current.length - 1)
      selectInputField(inputRefArr.current[idx + 1]);
  } else {
    if (idx !== 0) selectInputField(inputRefArr.current[idx - 1]);
  }
};

export const handleKeyPress: HandleKeyPressType = (
  e,
  idx,
  otp,
  setOtp,
  refArr,
  setIsError,
  setIsSuccess,
  submitOtp
) => {
  setIsError(false);
  setIsSuccess(false);
  const { NEXT, PREVIOUS } = MOVE_DIRECTION;
  const newOtp: OTPType = [...otp];
  if (/^\d$/.test(e.key)) {
    newOtp[idx] = e.key as OTPChar;
    if (newOtp[idx]) {
      moveTo(NEXT, idx, refArr);
    }
    if (isOTPValid(newOtp)) submitOtp(joinOTP(newOtp));
    setOtp(newOtp);
  } else if (e.key === "Backspace") {
    newOtp[idx] = "";
    setOtp(newOtp);
    moveTo(PREVIOUS, idx, refArr);
  } else if (e.key === "Delete") {
    newOtp.splice(idx, 1);
    newOtp[otp.length - 1] = "";
    setOtp(newOtp);
    selectInputField(e.currentTarget);
  } else if (e.key === "ArrowLeft") {
    moveTo(PREVIOUS, idx, refArr);
  } else if (e.key === "ArrowRight") {
    moveTo(NEXT, idx, refArr);
  }
};
