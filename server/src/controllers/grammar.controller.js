import { apiStatus, httpStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import GrammarService from '../service/grammar.service.js';
import UserService from '../service/user.service.js';

export const getGrammarById = async (req, res) => {
  try {
    let grammarId = req.params.grammarId;
    let grammar = await GrammarService.findGrammarById(grammarId);
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'get grammar successfully',
      data: grammar,
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

export const submitFinishedGrammar = async (req, res) => {
  try {
    let grammarId = req.query.grammarId;

    //check grammar exist
    const grammar = await GrammarService.findGrammarById(grammarId);

    //update to progressGrammar of user
    let userId = req.userId;
    let user = await UserService.findUserById(userId);
    user.progressGrammar.push(grammar._id);
    const updateUser = await UserService.updateUser(user);

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'submit finished grammar successfully',
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

export const getListChapter = async (req, res) => {
  try{
    let listChapter = await GrammarService.getListChapter();
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: "get list chapter successfully",
      data: listChapter
    });
  }catch(err){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
}