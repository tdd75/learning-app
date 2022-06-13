import { apiStatus, httpStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import { Otp } from '../models/index.js';

const OtpService = {};

OtpService.findOtpByValueAndStatus = async (userId, otpValue) => {
  let otp = await Otp.findOne({ userId: userId, otpValue: otpValue, usedOk: 0 });
  if (!otp) {
    throw new CustomError(
      httpStatus.UNAUTHORIZED,
      apiStatus.AUTH_ERROR,
      `Incorrect otp value!`,
    );
  }
  return otp;
};

OtpService.addOtp = async (newOtp) => {
  await Otp.insertMany(newOtp);
};

export default OtpService;
