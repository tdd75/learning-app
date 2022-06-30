export const enum PageName {
  HOME_PAGE = 'HomePage',
  LOGIN_PAGE = 'LoginPage',
  REGISTER_PAGE = 'RegisterPage',
  VOCABULARY_PAGE = 'VocabularyPage',
  VOCABULARY_LEARN_PAGE = 'VocabularyLearnPage',
  VOCABULARY_TEST_PAGE = 'VocabularyTestPage',
  GRAMMAR_PAGE = 'GrammarPage',
  GRAMMAR_LEARN_PAGE = 'GrammarLearnPage',
  GRAMMAR_TEST_PAGE = 'GrammarTestPage',
  DIALOGUE_PAGE = 'DialoguePage',
}

export const enum SUPPORT_LANGUAGE {
  VI = 'vi',
}

export const DEFAULT_LANGUAGE = SUPPORT_LANGUAGE.VI;

export const enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  GROUP_HAS_CHILDREN = 410,
  GROUP_MAX_LEVEL = 411,
  GROUP_MAX_QUANTITY = 412,
  AWS_ERROR = 413,
  ITEM_NOT_FOUND = 444,
  ITEM_ALREADY_EXIST = 445,
  ITEM_INVALID = 446,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export const FORM_VALIDATION = {
  textMaxLength: 255,
  textAreaMaxLength: 2000,
  passwordMinLength: 6,
  phoneRegExp:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  nameRegExp: /^([^!@`~#$:%^*&()<>?\\/\\+|=]+?)$/,
};

export const enum DeviceType {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}

export const DEBOUNCE_TIME = 1000;
