import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import { GrammarTask } from '../models/index.js';

const GrammarTaskService = {};

GrammarTaskService.findGrammarTaskById = async (grammarTaskId) => {
  let grammarTask = await GrammarTask.findById(grammarTaskId);
  if (!grammarTask) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      apiStatus.DATABASE_ERROR,
      `GrammarTask not found with id: ${grammarTaskId}`,
    );
  }
  return grammarTask;
};

export default GrammarTaskService;
