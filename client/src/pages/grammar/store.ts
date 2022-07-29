import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import { IAxiosError, IChapter, IPagination, ITopic } from '../../common/interfaces';
import { grammarApiService } from '../../common/service/grammar.api.service';

export const useGrammarStore = defineStore('grammar', {
  state: () => ({
    chapterList: [] as IChapter[],
    lengthChapterList: 0,
    progress: '',
    pagination: {} as IPagination,
  }),
  actions: {
    async getChapterList(pagination?: IPagination): Promise<string | void> {
      try {
        const response = await grammarApiService.getChapterList(pagination);
        this.chapterList = response.data.data.items;
        this.lengthChapterList = response.data.data.totalItems;
        this.progress = response.data.data.globalProcess!;
      } catch (error) {
        return (error as IAxiosError).response?.data?.message;
      }
    },
  },
});
