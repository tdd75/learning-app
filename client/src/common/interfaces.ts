export interface IResponseError {
  status: number;
  message: string;
}

export interface IResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ICommonGetListResponse<T> {
  items: T[];
  totalItems: number;
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
  progressVocabulary: Array<number>;
  progressGrammar: Array<number>;
  progressGrammarTask: Array<number>;
  createdAt: string;
  updatedAt: string;
}
