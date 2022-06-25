import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import WordService from '../service/word.service.js';
import UserService from '../service/user.service.js';


/**
 * Get All Volcabulary (has paging)
 * @param {Object} res response API
 * @returns status API + message + data
 */
export const getAllVol = async (req, res) => {
  try {
    let limit = req.query.limit;
    let offset = req.query.offset;

    let word = await WordService.findWordPaging(limit, offset);
    let totalPage = await WordService.countTotalPage(limit);

    let dataReturn = {
      "words": word,
      "totalPage" : totalPage
    }

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'Get list word successfuly ',
      data: dataReturn,
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

/**
 * Get All Volcabulary by topic
 * @param {Object} res response API
 * @returns status API + message + data
 */
 export const getVolByTopic = async (req, res) => {

  try {

    let topic = req.query.topicId; 

    let word = await WordService.findByTopic(topic);

    let dataReturn = {
      "words": word
    }

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'Get list word by topic successfuly ',
      data: dataReturn,
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

/**
 * Get Process list vol for USER role
 * @param {Header: Authorization} req
 * @param {Object} res response API
 * @returns status API + message + page index process (600 word -> /10 topic. 60 word by topic)
 */
export const getVolProcess = async (req, res) => {
  try {
    let userId = req.userId;
    let user = await UserService.findUserById(userId);

    console.log(user.getVolProcess)

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'get user information successfully!',
      data: user,
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
    // message: err.message,
  });
  }
};
