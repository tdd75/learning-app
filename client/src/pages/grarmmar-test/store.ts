import { defineStore } from 'pinia';
import { IAxiosError, ITask, IWordTest } from '../../common/interfaces';
import { grammarApiService } from '../../common/service/grammar.api.service';

export const useGrammarTestStore = defineStore('grammarTest', {
  state: () => ({
    wordList: [] as ITask[],
    score: new Set(),
    isDisable: false,
  }),
  getters: {
    lengthWordList: (state) => state.wordList.length,
  },
  actions: {
    async getWordList(topic: string): Promise<string | void> {
      try {
        const response = await grammarApiService.getTaskList(topic);
        this.wordList = response.data.data.items;
      } catch (error) {
        return (error as IAxiosError).response?.data?.message;
      }
    },
  },
});
