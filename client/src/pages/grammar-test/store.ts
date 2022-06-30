// import { defineStore } from 'pinia';
// import { string } from 'yup';
// import { IAxiosError, IChapter, IWord } from '../../common/interfaces';
// import { grammarApiService } from '../../common/service/grammar.api.service';

// export const useGrammarTestStore = defineStore('grammarTest', {
//   state: () => ({
//     chapterList: [] as IChapter[],
//     progress: '',
//     currentIndex: 0,
//   }),
//   getters: {
//     currentWord: (state) => state.chapterList[state.currentIndex],
//   },
//   actions: {
//     async getWordList(topicId: string): Promise<string | void> {
//       try {
//         const response = await grammarApiService.getChapterById(topicId);
//         this.chapterList = response.data.data.items;
//         this.progress = response.data.data.process as string;
//         const [num, den] = this.progress?.split('/') as Array<string>;
//         if (num !== den) {
//           this.currentIndex = parseInt(num);
//         }
//       } catch (error) {
//         return (error as IAxiosError).response?.data?.message;
//       }
//     },
//   },
// });
