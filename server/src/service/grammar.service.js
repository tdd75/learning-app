import { apiStatus, httpStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import { Grammar } from '../models/index.js';

const GrammarService = {};

GrammarService.findGrammarById = async (grammarId) => {
  let grammar = await Grammar.findById(grammarId);
  if (!grammar) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      apiStatus.DATABASE_ERROR,
      `Grammar not found with id: ${grammarId}`,
    );
  }
  return grammar;
};

GrammarService.findAllGrammarByChapter = async (chapterName) => {
  let listGrammar = await Grammar.find({ chapter: chapterName });
  return listGrammar;
};

export default GrammarService;
