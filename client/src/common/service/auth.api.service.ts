import axios from '@/plugins/axios';
import { AxiosResponse } from 'axios';
import { IAxiosResponse, IForgotPassword, ILoginResponse } from '../interfaces';

class AuthApiService {
  async login(email: string, password: string): Promise<IAxiosResponse<ILoginResponse>> {
    return await axios.post('/user/login', {
      email,
      password,
    });
  }
  async register(
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<IAxiosResponse<null>> {
    return await axios.post('/register', {
      email,
      username,
      password,
      firstName,
      lastName,
    });
  }
  async forgotPassword(email: string): Promise<IAxiosResponse<IForgotPassword>> {
    return await axios.post('/user/forgot-password', {
      to: email,
    });
  }
  async verifyOtp(userId: string, otp: string): Promise<IAxiosResponse<null>> {
    return await axios.post('/user/verify-otp', {
      userId,
      otpValue: otp,
    });
  }
  async changeForgotPassword(
    userId: string,
    newPassword: string,
  ): Promise<IAxiosResponse<null>> {
    return await axios.post('/user/change-forgot-password', {
      userId,
      newPassword,
    });
  }
}

export const authApiService = new AuthApiService();
