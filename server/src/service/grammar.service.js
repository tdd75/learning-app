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

GrammarService.getListChapter = async () => {
  let chapters = await Grammar.find().select({'chapter': 1}).distinct('chapter');
  return chapters;
}

GrammarService.addGrammar = async (grammarRequest) => {
  await grammarRequest.save((err, grammar) => {
    if(err){
      throw new CustomError(
        httpStatus.INTERNAL_SERVER_ERROR,
        apiStatus.DATABASE_ERROR,
        `Error when save grammar: ${err.message}`
      )
    }
    return grammar;
  });
  return grammarRequest;
}

GrammarService.updateGrammar = async (grammarRequest, grammarId) => {
  let updateGrammar = await Grammar.findByIdAndUpdate(grammarId, grammarRequest, {new: true});
  if(!updateGrammar){
    throw new CustomError(
      httpStatus.INTERNAL_SERVER_ERROR,
      apiStatus.DATABASE_ERROR,
      `Did not find grammar with id: ${grammarId}`
    )
  }
  return updateGrammar;
}

GrammarService.deleteGrammar = async (grammarId) => {
  let deleteGrammar = await Grammar.findByIdAndDelete(grammarId);
  if(!deleteGrammar){
    throw new CustomError(
      httpStatus.INTERNAL_SERVER_ERROR,
      apiStatus.DATABASE_ERROR,
      `Did not find grammar with id: ${deleteGrammar}`
    )
  }
  return deleteGrammar;
}

export default GrammarService;
