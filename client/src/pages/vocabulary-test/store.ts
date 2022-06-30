import { defineStore } from 'pinia';
import { string } from 'yup';
import { IAxiosError, IWord } from '../../common/interfaces';
import { vocabularyApiService } from '../../common/service/vocabulary.api.service';

export const useVocabularyTestStore = defineStore('vocabularyTest', {
  state: () => ({
    wordList: [] as IWord[],
    progress: '',
    currentIndex: 0,
  }),
  getters: {
    currentWord: (state) => state.wordList[state.currentIndex],
  },
  actions: {
    async getWordList(topicId: string): Promise<string | void> {
      try {
        const response = await vocabularyApiService.getTopicById(topicId);
        this.wordList = response.data.data.items;
        this.progress = response.data.data.process as string;
        const [num, den] = this.progress?.split('/') as Array<string>;
        if (num !== den) {
          this.currentIndex = parseInt(num);
        }
      } catch (error) {
        return (error as IAxiosError).response?.data?.message;
      }
    },
  },
});
