import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import UserService from '../service/word.service.js';

/**
 * Get All Volcabulary (has paging)
 * @param {Object} res response API
 * @returns status API + message + data
 */
export const getAllVol = async (req, res) => {
  try {

    let limit = req.query.limit;
    let offset = req.query.offset;

    let word = await UserService.findWordPaging(limit, offset);
    let totalPage = await UserService.countTotalPage(limit);

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
 * Get Process list vol for USER role
 * @param {Header: Authorization} req
 * @param {Object} res response API
 * @returns status API + message + user profile(if not error)
 */
export const getVolProcess = async (req, res) => {
  // try {
  //   let userId = req.userId;
  //   let user = await UserService.findUserById(userId);
  //   return res.status(httpStatus.OK).send({
  //     status: apiStatus.SUCCESS,
  //     message: 'get user information successfully!',
  //     data: user,
  //   });
  // } catch (err) {
  //   if (err instanceof CustomError) {
  //     return res.status(err.httpStatus).send({
  //       status: err.apiStatus,
  //       message: err.message,
  //     });
  //   }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    status: apiStatus.OTHER_ERROR,
    // message: err.message,
  });
  // }
};
