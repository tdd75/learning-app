import express from 'express';
import {
  forgotPasswordAdmin,
  refreshToken,
  signinAdmin,
  verifyOtp,
} from '../controllers/auth.controller.js';
import { getUserProfile } from '../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../middleware/authJwt.js';
import { validateLogin } from '../middleware/validator.js';

const adminRoutes = express.Router();

adminRoutes.post('/api/v1/admin/login', validateLogin, signinAdmin);
adminRoutes.post('/api/v1/admin/refresh-token', refreshToken);
adminRoutes.get('/api/v1/admin/auth/profile', [verifyToken, isAdmin], getUserProfile);
adminRoutes.post('/api/v1/admin/forgot-password', forgotPasswordAdmin);
adminRoutes.post('/api/v1/admin/verify-otp',verifyOtp);
export default adminRoutes;
