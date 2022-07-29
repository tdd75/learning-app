import { defineStore } from 'pinia';
import { IAxiosError, IWordTest } from '../../common/interfaces';
import { vocabularyApiService } from '../../common/service/vocabulary.api.service';

export const useVocabularyTestStore = defineStore('vocabularyTest', {
  state: () => ({
    wordList: [] as IWordTest[],
    score: new Set(),
    isDisable: false,
  }),
  getters: {
    lengthWordList: (state) => state.wordList.length,
  },
  actions: {
    async getWordList(topicId: string): Promise<string | void> {
      try {
        const response = await vocabularyApiService.getQuiz(topicId);
        this.wordList = response.data.data.items;
      } catch (error) {
        return (error as IAxiosError).response?.data?.message;
      }
    },
  },
});
