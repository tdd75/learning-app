import axios from '@/plugins/axios';
import {
  IAxiosResponse,
  IListResponse,
  ITopic,
  IPagination,
  IWord,
  IChapter,
} from '../interfaces';
import qs from 'qs';

class GrammarApiService {
  async getChapterList(
    pagination?: IPagination,
  ): Promise<IAxiosResponse<IListResponse<IChapter>>> {
    return await axios.get(`/user/grammar?${qs.stringify(pagination)}`);
  }
  async getTopicById(id: string): Promise<IAxiosResponse<IListResponse<IWord>>> {
    return await axios.get(`/admin/auth/grammar/by-chapter?idTopic=${id}`);
  }
  async doneWord(id: string): Promise<IAxiosResponse<null>> {
    return await axios.put(`/user/vocal/process?wordId=${id}`);
  }
}

export const grammarApiService = new GrammarApiService();
