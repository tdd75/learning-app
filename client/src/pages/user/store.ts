import { defineStore } from 'pinia';
import { IAxiosError, IProfile } from '../../common/interfaces';
import { userApiService } from '../../common/service/user.api.service';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {} as IProfile,
  }),
  actions: {
    async getProfile(): Promise<string | void> {
      try {
        const response = await userApiService.getProfile();
        this.userInfo = response.data.data;
      } catch (error) {
        return (error as IAxiosError).response?.data?.message;
      }
    },
    async removeProfile(): Promise<string | void> {
      this.userInfo = {} as IProfile;
    },
  },
});
