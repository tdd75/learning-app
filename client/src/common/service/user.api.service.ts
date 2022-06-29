import axios from '@/plugins/axios';
import { AxiosResponse } from 'axios';
import { IProfile, IResponse } from '../interfaces';

class UserApiService {
  async getProfile(): Promise<AxiosResponse<IResponse<IProfile>>> {
    return await axios.get('/user/auth/profile');
  }
}

export const userApiService = new UserApiService();
