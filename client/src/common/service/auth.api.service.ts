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
}

export const authApiService = new AuthApiService();
