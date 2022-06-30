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

GrammarService.findAllGrammarByChapter = async (chapterId) => {
  let listGrammar = await Grammar.find({ chapterId: chapterId }).populate({path: 'chapterId'});
  return listGrammar;
};

GrammarService.addGrammar = async (grammarRequest) => {
  await grammarRequest.save((err, grammar) => {
    if (err) {
      throw new CustomError(
        httpStatus.INTERNAL_SERVER_ERROR,
        apiStatus.DATABASE_ERROR,
        `Error when save grammar: ${err.message}`,
      );
    }
    return grammar;
  });
  return grammarRequest;
};

GrammarService.updateGrammar = async (grammarRequest, grammarId) => {
  let updateGrammar = await Grammar.findByIdAndUpdate(grammarId, grammarRequest, {
    new: true,
  });
  if (!updateGrammar) {
    throw new CustomError(
      httpStatus.INTERNAL_SERVER_ERROR,
      apiStatus.DATABASE_ERROR,
      `Did not find grammar with id: ${grammarId}`,
    );
  }
  return updateGrammar;
};

GrammarService.deleteGrammar = async (grammarId) => {
  let deleteGrammar = await Grammar.findByIdAndDelete(grammarId);
  if (!deleteGrammar) {
    throw new CustomError(
      httpStatus.INTERNAL_SERVER_ERROR,
      apiStatus.DATABASE_ERROR,
      `Did not find grammar with id: ${deleteGrammar}`,
    );
  }
  return deleteGrammar;
};

GrammarService.findAllGrammarWithPaginationAndKeyword = async (page, size, keyword) => {
  const limit = size ? size : 10;
  const offset = page ? (page - 1) * limit : 1;
  let condition = keyword 
    ? {title: {$regex: new RegExp(`.*${keyword}.*`), $options: 'i'}}
    : {};
  let response = await Grammar.paginate(condition, {offset, limit}).then((data) => {
    return {
      totalItems: data.totalDocs,
      items: data.docs,
      totalPages: data.totalPages,
      currentPage: parseInt(page ? page : offset)
    }
  });
  return response;
}

export default GrammarService;
