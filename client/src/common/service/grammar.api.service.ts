import axios from '@/plugins/axios';
import {
  IAxiosResponse,
  IListResponse,
  ITopic,
  IPagination,
  IWord,
  IChapter,
  IGrammar,
} from '../interfaces';
import qs from 'qs';
import { TYPE_SUBMIT } from '../constants';

class GrammarApiService {
  async getChapterList(
    pagination?: IPagination,
  ): Promise<IAxiosResponse<IListResponse<IChapter>>> {
    return await axios.get(`/user/auth/chapter-list?${qs.stringify(pagination)}`);
  }
  async getChapterById(id: string): Promise<IAxiosResponse<IListResponse<IGrammar>>> {
    return await axios.get(`/user/auth/grammar/by-chapter?chapterId=${id}`);
  }
  async finishChapter(
    chapterId: string,
    type: TYPE_SUBMIT,
  ): Promise<IAxiosResponse<null>> {
    return await axios.post('/user/auth/finish-chapter', {
      chapterId,
      type,
    });
  }
}

export const grammarApiService = new GrammarApiService();
