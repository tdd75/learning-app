import express from 'express';
import {
  forgotPassword,
  refreshToken,
  register,
  signin,
  verifyOtp,
} from '../controllers/auth.controller.js';
import { getUserProfile } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/authJwt.js';
import { validateLogin, validatorRegister } from '../middleware/validator.js';

const userRoutes = express.Router();

userRoutes.post('/api/v1/register', validatorRegister, register);
userRoutes.post('/api/v1/user/login', validateLogin, signin);
userRoutes.post('/api/v1/user/refresh-token', refreshToken);
userRoutes.get('/api/v1/user/auth/profile', [verifyToken], getUserProfile);
userRoutes.post('/api/v1/user/forgot-password', forgotPassword);
userRoutes.post("/api/v1/user/verify-otp",verifyOtp)
export default userRoutes;
