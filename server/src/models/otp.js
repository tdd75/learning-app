import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema(
  {
    otpValue: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    usedOk: {
      type: Number,
      required: true,
      default: 0,
    },
    timeStart: {
      type: Date,
      required: true,
    },
    timeEnd: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

const Otp = mongoose.model('Otp', OtpSchema);
export default Otp;
