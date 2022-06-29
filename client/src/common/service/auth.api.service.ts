import axios from '@/plugins/axios';
import { AxiosResponse } from 'axios';
import { ILoginResponse, IResponse } from '../interfaces';

class AuthApiService {
  async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<IResponse<ILoginResponse>>> {
    return await axios.post('/user/login', {
      email,
      password,
    });
  }
}

export const authApiService = new AuthApiService();
