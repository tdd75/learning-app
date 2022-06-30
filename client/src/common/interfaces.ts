import { AxiosError, AxiosResponse } from 'axios';

export interface IResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface IError {
  status: number;
  message: string;
}

export type IAxiosResponse<T> = AxiosResponse<IResponse<T>>;

export type IAxiosError = AxiosError<IError>;

export interface IListResponse<T> {
  items: T[];
  totalItems: number;

  globalProcess?: string;
  process?: string;
  chapterName?: string;
  status?: number;
}

export interface IPagination {
  limit: number;
  offset: number;
}

export interface ILoginResponse {
  token: string;
  tokenExpire: string;
  refreshToken: string;
  refreshTokenExpire: string;
}

export interface IProfile {
  _id: string;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  roleId: string;
  avatarUrl: string;
  progressVocabulary: number[];
  progressGrammar: number[];
  progressGrammarTask: number[];
  createdAt: string;
  updatedAt: string;
}

export interface ITopic {
  topicId: number;
  topicStatus: string;
}

export interface IWord {
  _id: string;
  keyword: string;
  shortDesc: string;
  suggest: string;
  sound: string;
  image: string;
  transcription: string;
  explanation: string;
  meaningSound: string;
  exampleSound: string;
  fullVietnamese: string;
  topic: number;
  createdAt: string;
  updatedAt: string;
  processStatus: number;
}

export interface IWordTest {
  word: IWord;
  trueMeaning: string;
  wrongMeaning: string[];
}

export interface IGrammar {
  _id: string;
  chapterId: string;
  title: string;
  sound: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChapter {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: number;
}
