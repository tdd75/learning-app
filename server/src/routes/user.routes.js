import express from 'express';
import {
  changeForgotPassword,
  forgotPassword,
  refreshToken,
  register,
  signin,
  verifyOtp,
} from '../controllers/auth.controller.js';
import { changePassword, getListUser, getUserProfile, searchInListUser, updateUserProfile } from '../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../middleware/authJwt.js';
import { validateLogin, validatorRegister } from '../middleware/validator.js';

const userRoutes = express.Router();

userRoutes.post('/api/v1/register', validatorRegister, register);
userRoutes.post('/api/v1/user/login', validateLogin, signin);
userRoutes.post('/api/v1/user/refresh-token', refreshToken);
userRoutes.get('/api/v1/user/auth/profile', [verifyToken], getUserProfile);
userRoutes.post('/api/v1/user/forgot-password', forgotPassword);
userRoutes.post('/api/v1/user/change-forgot-password', changeForgotPassword);
userRoutes.post('/api/v1/user/verify-otp', verifyOtp);
userRoutes.post('/api/v1/user/auth/update-profile', verifyToken, updateUserProfile);
userRoutes.post('/api/v1/user/auth/change-password', verifyToken, changePassword);
userRoutes.post('/api/v1/admin/auth/change-password', [verifyToken, isAdmin], changePassword);
userRoutes.get('/api/v1/admin/auth/list-users', [verifyToken, isAdmin], getListUser);
userRoutes.get('/api/v1/admin/auth/search-list-users', [verifyToken, isAdmin], searchInListUser);
export default userRoutes;
