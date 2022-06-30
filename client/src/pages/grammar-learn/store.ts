import { defineStore } from 'pinia';
import { string } from 'yup';
import { TYPE_SUBMIT } from '../../common/constants';
import { IAxiosError, IGrammar, IWord } from '../../common/interfaces';
import { grammarApiService } from '../../common/service/grammar.api.service';

export const useGrammarLearnStore = defineStore('grammarLearn', {
  state: () => ({
    grammarList: [] as IGrammar[],
    chapterName: '',
    status: false,
  }),
  actions: {
    async getGrammarList(chapterId: string): Promise<string | void> {
      try {
        const response = await grammarApiService.getChapterById(chapterId);
        this.grammarList = response.data.data.items;
        this.chapterName = response.data.data.chapterName!;
        this.status = response.data.data.status === 1;
      } catch (error) {
        return (error as IAxiosError).response?.data?.message;
      }
    },
    async finishChapter(chapterId: string): Promise<string | void> {
      try {
        await grammarApiService.finishChapter(chapterId, TYPE_SUBMIT.SUBMIT);
      } catch (error) {
        return (error as IAxiosError).response?.data?.message;
      }
    },
  },
});
