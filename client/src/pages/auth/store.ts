import { defineStore } from 'pinia';
import { authApiService } from '@/common/service/auth.api.service';
import { IAxiosError } from '../../common/interfaces';
import axios from '@/plugins/axios';
import { useUserStore } from '../user/store';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoginPage: true,
    isShowForgotPassword: false,
    token: '',
  }),
  actions: {
    async setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', this.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    },
    async removeToken() {
      this.token = '';
      localStorage.setItem('token', '');
      axios.defaults.headers.common['Authorization'] = '';
    },
    async login(email: string, password: string): Promise<string | void> {
      const userStore = useUserStore();

      try {
        const response = await authApiService.login(email, password);
        // set token
        this.setToken(response.data.data.token);

        // get profile
        userStore.getProfile();
      } catch (error) {
        return (error as IAxiosError).response?.data?.message;
      }
    },
    async logout() {
      const userStore = useUserStore();

      // remove token
      await this.removeToken();
      // remove profile
      userStore.removeProfile();
    },
    // async register(
    //   email: string,
    //   username: string,
    //   password: string,
    //   firstName: string,
    //   lastName: string,
    // ): Promise<string | void> {
    //   try {
    //     const response = await authApiService.login(email, password);
    //     this.token = response.data.token;
    //   } catch (error) {
    //     return (error as AxiosError<IResponseError>).response?.data?.message;
    //   }
    // },
    async autoLogin(token: string) {
      const userStore = useUserStore();

      this.setToken(token);
      userStore.getProfile();
    },
  },
});
