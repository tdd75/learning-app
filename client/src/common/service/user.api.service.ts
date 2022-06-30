import axios from '@/plugins/axios';
import { AxiosResponse } from 'axios';
import { IProfile, IAxiosResponse } from '../interfaces';

class UserApiService {
  async getProfile(): Promise<IAxiosResponse<IProfile>> {
    return await axios.get('/user/auth/profile');
  }
}

export const userApiService = new UserApiService();
