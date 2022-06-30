import { apiStatus, httpStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import GrammarTask from '../models/grammarTask.js';
import GrammarTaskService from '../service/grammarTask.service.js';
import UserService from '../service/user.service.js';
import mongoose from 'mongoose';

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

export const addGrammarTask = async (req, res) => {
  try {
    const addGrammarTaskRequest = new GrammarTask({
      task: req.body.task,
      trueAnswer: req.body.trueAnswer,
      listAnswer: req.body.listAnswer,
      comment: req.body.comment,
      topic: req.body.topic,
      level: req.body.level,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    let newTask = await GrammarTaskService.addGrammarTask(addGrammarTaskRequest);
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'add grammar task successfully',
      data: newTask,
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
export const updateGrammarTask = async (req, res) => {
  try {
    let taskId = req.params.taskId;
    let request = {};
    let listProps = ['task', 'trueAnswer', 'listAnswer', 'comment', 'topic', 'level'];
    for (let i = 0; i < listProps.length; i++) {
      let props = listProps[i];
      if (req.body[props] !== undefined) {
        request[props] = req.body[props];
      }
    }
    request['updatedAt'] = Date.now();
    let updateTask = await GrammarTaskService.updateGrammarTask(request, taskId);
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'update grammar task successfully',
      data: updateTask,
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

export const deleteGrammarTask = async (req, res) => {
  try {
    let taskId = req.params.taskId;
    let deleteTask = await GrammarTaskService.deleteGrammarTask(taskId);
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'delete grammar task successfully',
      data: deleteTask,
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

export const getListTaskByTopicWithPagination = async (req, res) => {
  try{
    let size = req.query.limit;
    let page = req.query.offset;
    if(page <= 0 || size <= 0 ) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: apiStatus.INVALID_PARAM,
        message: "Limit and Offset must be greater than 0"
      });
    }
    let topic = req.query.topic;

    let listTask = await GrammarTaskService.getListTaskByTopicAndPagination(page, size, topic);
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: "Get list task by topic successfully",
      data: listTask
    });
  }catch(err){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
}


export const getListTaskWithPagination = async (req, res) => {
  try{
    let size = req.query.limit;
    let page = req.query.offset;
    if(page <= 0 || size <= 0 ) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: apiStatus.INVALID_PARAM,
        message: "Limit and Offset must be greater than 0"
      });
    }

    let listTask = await GrammarTaskService.getListTaskAndPagination(page, size);
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: "Get list task by topic successfully",
      data: listTask
    });
  }catch(err){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
}

export const markDoneTask = async (req, res) => {
  try{
    let userId = req.userId;
    let taskId = req.body.taskId;
    let grammarTask = await GrammarTaskService.findGrammarTaskById(taskId);
    let topic = req.body.topic;
    let listTask = await GrammarTaskService.getListTaskByTopicAndPagination(1, 10, topic);
    if(listTask.length === 0) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: apiStatus.INVALID_PARAM,
        message: "Topic name not exist!"
      });
    }
    let user = await UserService.findUserById(userId);
    let progressList = user.progressGrammarTask;
    //check topic is in progress list
    if(progressList.some(item => (item.topic !== undefined && item.topic === topic))){
      for(let i = 0; i< progressList.length; i++){
        if(progressList[i].topic === topic){
          progressList[i].complete.push(new mongoose.Types.ObjectId(taskId));
        }
      }
      user.progressGrammarTask = progressList;
    }else{
      user.progressGrammarTask.push({
        topic: topic,
        complete: [
          grammarTask._id
        ]
      })
    }
    await UserService.updateUser(user);
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: "Mark done task successfully!"
    });
  }catch(err){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
}