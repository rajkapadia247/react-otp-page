import { isOTPValid, joinOTP } from "../utils";

describe("Utils", () => {
  test("isOTPValid", () => {
    expect(isOTPValid(["1", "1", "1", "1", "1", "1"])).toBe(true);
    expect(isOTPValid(["1", "1", "1", "1", "1", ""])).toBe(false);
    expect(isOTPValid(["1", "1", "1", "", "1", ""])).toBe(false);
  });

  test("joinOTP", () => {
    expect(joinOTP(["1", "1", "2", "4", "1", "1"])).toBe("112411");
    expect(joinOTP(["1", "1", "2", "4", "", "1"])).toBe("1124-1");
    expect(joinOTP(["1", "1", "", "4", "", "1"])).toBe("11-4-1");
  });
});
