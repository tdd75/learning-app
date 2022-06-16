import { apiStatus, httpStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import GrammarTaskService from '../service/grammarTask.service.js';
import UserService from '../service/user.service.js';

export const getGrammarTaskById = async (req, res) => {
  try {
    let taskId = req.params.taskId;
    let grammarTask = await GrammarTaskService.findGrammarTaskById(taskId);

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'get grammar task successfully',
      data: grammarTask,
    });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.httpStatus).send({
        status: err.apiStatus,
        message: err.message,
      });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
};

export const submitFinishTask = async (req, res) => {
  try {
    let taskId = req.query.taskId;

    //check task exist
    let task = await GrammarTaskService.findGrammarTaskById(taskId);
    let userId = req.userId;

    //update to progressGrammarTask of user
    let user = await UserService.findUserById(userId);
    user.progressGrammarTask.push(task._id);
    const updateUser = await UserService.updateUser(user);

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'submit finished grammar task successfully',
      data: updateUser,
    });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.httpStatus).send({
        status: err.apiStatus,
        message: err.message,
      });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
};
