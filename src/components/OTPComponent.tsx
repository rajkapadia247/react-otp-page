import { useEffect, useRef, useState, type FC } from "react";
import type { OTPType } from "../types";
import "../OtpComponent.css";
import { OTPInputField } from "./OTPInputField";
import { CORRECT_OTP, OTP_RESEND_COOLDOWN_SECONDS } from "../constants";
import { CopyIcon } from "./CopyIcon";

interface OTPComponentProps {
  otpSize: number;
}

export const OTPComponent: FC<OTPComponentProps> = ({ otpSize = 6 }) => {
  const [otp, setOtp] = useState<OTPType>(new Array(otpSize).fill(""));
  const inputRefArr = useRef<HTMLInputElement[]>([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    inputRefArr.current?.[0]?.focus();
  }, []);

  useEffect(() => {
    if (isOTPSent) {
      const countdownInterval = setInterval(() => {
        if (timeRemaining === 1) {
          setIsOTPSent(false);
          clearTimeout(countdownInterval);
        } else setTimeRemaining((t) => t - 1);
      }, 1000);
      return () => clearInterval(countdownInterval);
    }
  }, [isOTPSent, timeRemaining]);

  const copyHintOtp = () => {
    navigator.clipboard.writeText(CORRECT_OTP);
  };

  const sendOtpAgain = () => {
    setIsOTPSent(true);
    setTimeRemaining(OTP_RESEND_COOLDOWN_SECONDS);
  };

  const checkOtp = (otp: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(otp === CORRECT_OTP);
      }, 500);
    });
  };

  const submitOtp = async (submittedOtp: string) => {
    const isValid = await checkOtp(submittedOtp);
    if (!isValid) {
      setIsError(true);
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
    setOtp(new Array(otpSize).fill(""));
    inputRefArr.current?.[0]?.focus();
  };

  return (
    <>
      <div className="heading-box">
        <h1 className="heading">Verify OTP</h1>
        <span className="subtitle">
          We have sent an OTP to your mobile number.
        </span>
      </div>
      <form className="otp-form">
        <div className="otp-inputs">
          {otp.map((_, i) => {
            return (
              <OTPInputField
                key={i}
                index={i}
                otp={otp}
                setOtp={setOtp}
                inputRefArr={inputRefArr}
                isError={isError}
                isSuccess={isSuccess}
                setIsError={setIsError}
                setIsSuccess={setIsSuccess}
                submitOtp={submitOtp}
              />
            );
          })}
        </div>
        {isError && (
          <span className="error-msg">
            ❌ You have entered an incorrect OTP. Please try again.
          </span>
        )}
        {isSuccess && (
          <span className="success-msg">✅ We are logging you in...</span>
        )}
      </form>
      {!isSuccess && (
        <>
          {!isOTPSent ? (
            <span className="retry">
              Didn't receive code?{" "}
              <button className="send-again-btn" onClick={sendOtpAgain}>
                Send again
              </button>
            </span>
          ) : (
            <span className="retry">
              We have sent a new OTP. Try again after {timeRemaining} seconds.
            </span>
          )}
        </>
      )}
      {!isSuccess && (
        <span className="hint">
          Try: {CORRECT_OTP}{" "}
          <button onClick={copyHintOtp} className="copy-btn">
            <CopyIcon classList="copy-icon" />
          </button>
        </span>
      )}
    </>
  );
};
