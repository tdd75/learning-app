import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import { Word } from '../models/index.js';

const WordService = {};

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

export default WordService;
