import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import { IResponseError } from '../../common/interfaces';
import { userApiService } from '../../common/service/user.api.service';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
  }),
  actions: {
    async getProfile(): Promise<string | void> {
      try {
        const response = await userApiService.getProfile();
        this.userInfo = response.data.data;
      } catch (error) {
        return (error as AxiosError<IResponseError>).response?.data?.message;
      }
    },
    async removeProfile(): Promise<string | void> {
      this.userInfo = {};
    },
  },
});
