import axios from '@/plugins/axios';
import { AxiosResponse } from 'axios';
import { IAxiosResponse, ILoginResponse } from '../interfaces';

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
}

export const authApiService = new AuthApiService();
