import axios from '@/plugins/axios';
import { IAxiosResponse, IListResponse, ITopic, IPagination, IWord } from '../interfaces';
import qs from 'qs';

class VocabularyApiService {
  async getTopicList(
    pagination?: IPagination,
  ): Promise<IAxiosResponse<IListResponse<ITopic>>> {
    return await axios.get(`/user/vocal/process-all?${qs.stringify(pagination)}`);
  }
  async getTopicById(id: string): Promise<IAxiosResponse<IListResponse<IWord>>> {
    return await axios.get(`/user/vocal/process?idTopic=${id}`);
  }
  async doneWord(id: string): Promise<IAxiosResponse<null>> {
    return await axios.put(`/user/vocal/process?wordId=${id}`);
  }
}

export const vocabularyApiService = new VocabularyApiService();
