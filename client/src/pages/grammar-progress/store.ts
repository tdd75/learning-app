import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import { IAxiosError, IGrammarTopic, IPagination } from '../../common/interfaces';
import { grammarApiService } from '../../common/service/grammar.api.service';

export const useGrammarProgressStore = defineStore('grammarProgress', {
  state: () => ({
    topicList: [] as IGrammarTopic[],
    lengthTopicList: 0,
    progress: '',
    pagination: {} as IPagination,
  }),
  actions: {
    async getTopicList(pagination?: IPagination): Promise<string | void> {
      try {
        const response = await grammarApiService.getTopicList(pagination);
        this.topicList = response.data.data.items;
        this.lengthTopicList = response.data.data.totalItems;
        this.progress = response.data.data.globalProcess!;
      } catch (error) {
        return (error as IAxiosError).response?.data?.message;
      }
    },
  },
});
