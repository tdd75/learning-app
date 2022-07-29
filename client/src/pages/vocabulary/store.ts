import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import { IAxiosError, IPagination, ITopic } from '../../common/interfaces';
import { vocabularyApiService } from '../../common/service/vocabulary.api.service';

export const useVocabularyStore = defineStore('vocabulary', {
  state: () => ({
    topicList: [] as ITopic[],
    lengthTopicList: 0,
    progress: '',
    pagination: {} as IPagination,
  }),
  actions: {
    async getTopicList(pagination?: IPagination): Promise<string | void> {
      try {
        const response = await vocabularyApiService.getTopicList(pagination);
        this.topicList = response.data.data.items;
        this.lengthTopicList = response.data.data.totalItems;
        this.progress = response.data.data.globalProcess!;
      } catch (error) {
        return (error as IAxiosError).response?.data?.message;
      }
    },
  },
});
