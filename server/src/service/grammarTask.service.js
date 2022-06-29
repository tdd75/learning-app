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

GrammarTaskService.getListTaskTopic = async () => {
  let listTopic = await GrammarTask.find().select({topic: 1}).distinct('topic');
  return listTopic;
}

GrammarTaskService.addGrammarTask = async (grammarTaskRequest) => {
  await grammarTaskRequest.save((err, grammarTask) => {
    if(err){
      throw new CustomError(
        httpStatus.INTERNAL_SERVER_ERROR,
        apiStatus.DATABASE_ERROR,
        `Error when save grammar task: ${err.message}`
      )
    }
    return grammarTask;
  });
  return grammarTaskRequest;
}

GrammarTaskService.updateGrammarTask = async (request, grammarTaskId) => {
  let updateTask = await GrammarTask.findByIdAndUpdate(grammarTaskId, request, {new: true});
  if(!updateTask){
    throw new CustomError(
      httpStatus.INTERNAL_SERVER_ERROR,
      apiStatus.DATABASE_ERROR,
      `Did not find task with id: ${grammarTaskId}`
    )
  }
  return updateTask;
}

GrammarTaskService.deleteGrammarTask = async (grammarTaskId) => {
  let deleteTask = await GrammarTask.findByIdAndDelete(grammarTaskId);
  if(!deleteTask){
    throw new CustomError(
      httpStatus.INTERNAL_SERVER_ERROR,
      apiStatus.DATABASE_ERROR,
      `Did not find task with id: ${grammarTaskId}`
    )
  }
  return deleteTask;
}
export default GrammarTaskService;
