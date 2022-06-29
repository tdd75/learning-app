import express from 'express';
import {
  forgotPasswordAdmin,
  refreshToken,
  signinAdmin,
  verifyOtp,
} from '../controllers/auth.controller.js';
import { upload } from '../controllers/upload.controller.js';
import { getUserProfile } from '../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../middleware/authJwt.js';
import { validateLogin } from '../middleware/validator.js';
import multer from 'multer';
const adminRoutes = express.Router();
const uploadMulter = multer();

adminRoutes.post('/api/v1/admin/login', validateLogin, signinAdmin);
adminRoutes.post('/api/v1/admin/refresh-token', refreshToken);
adminRoutes.get('/api/v1/admin/auth/profile', [verifyToken, isAdmin], getUserProfile);
adminRoutes.post('/api/v1/admin/forgot-password', forgotPasswordAdmin);
adminRoutes.post('/api/v1/admin/verify-otp', verifyOtp);
adminRoutes.post('/api/v1/admin/upload',[verifyToken, isAdmin, uploadMulter.single('file')], upload)

export default adminRoutes;
