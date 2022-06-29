import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import { Word } from '../models/index.js';

const WordService = {};

/**
 * viết này cho chỉ export dc hàm này ra thôi
 * @param {*} wordId
 * @returns
 */
WordService.findWordById = async (wordId) => {
  let word = await Word.findById(wordId);
  if (!word) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      apiStatus.DATABASE_ERROR,
      `Word not found with id: ${wordId}`,
    );
  }
  return word;
};

 /** 
 * @param {*} wordId
 * @returns
 */
WordService.deleteWordById = async (wordId) => {
  let word = await Word.findByIdAndDelete(wordId);
  if (!word) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      apiStatus.DATABASE_ERROR,
      `Word not found with id: ${wordId}`,
    );
  }
  return word;
};

WordService.createWord = async (wordModel) => {

  await wordModel.save((err, word) => {
    if(err){
      throw new CustomError(
        httpStatus.INTERNAL_SERVER_ERROR,
        apiStatus.DATABASE_ERROR,
        `Error when save word: ${err.message}`
      )
    }
    return word;
  });
  return wordModel;

};

WordService.updateWord = async (wordId,wordReq) => {

  let updateWord = await Word.findByIdAndUpdate(wordId, wordReq, {new: true});
  if(!updateWord){
    throw new CustomError(
      httpStatus.INTERNAL_SERVER_ERROR,
      apiStatus.DATABASE_ERROR,
      `Did not find word  with id: ${wordId}`
    )
  }
  return updateWord;

};

WordService.findWordPaging = async (limit, offset) => {
  const pageOptions = {
    page: parseInt(offset, 10) || 0,
    limit: parseInt(limit, 10) || 10,
  };

  let word = await Word.find()
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit);

  if (!word) {
    throw new CustomError(httpStatus.NOT_FOUND, apiStatus.DATABASE_ERROR, `Paging err`);
  }

  return word;
};

WordService.findByTopic = async (topic) => {
  let word = await Word.where('topic').equals(topic);

  if (!word) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      apiStatus.DATABASE_ERROR,
      `Find by topic err`,
    );
  }

  return word;
};
 
WordService.countTotalPage  = async () => {

  // ví dụ đây k bất đồng bộ thì sao ?
  let count = await Word.countDocuments({})
 

  if (!count) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      apiStatus.DATABASE_ERROR,
      `Count all word err`,
    );
  } 
  return count;
 
};

export default WordService;
