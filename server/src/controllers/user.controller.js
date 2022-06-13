import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import UserService from '../service/user.service.js';
/**
 * Get User Profile for user with ADMIN and USER role
 * @param {Header: Authorization} req
 * @param {Object} res response API
 * @returns status API + message + user profile(if not error)
 */
export const getUserProfile = async (req, res) => {
  try {
    let userId = req.userId;
    let user = await UserService.findUserById(userId);
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
      message: err.message,
    });
  }
};
