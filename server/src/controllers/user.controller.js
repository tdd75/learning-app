import { User } from '../models/index.js';
import { httpStatus, apiStatus } from '../constants/index.js';
/**
 * Get User Profile for user with ADMIN and USER role
 * @param {Header: Authorization} req
 * @param {Object} res response API
 * @returns status API + message + user profile(if not error)
 */
export const getUserProfile = async (req, res) => {
  try {
    let userId = req.userId;
    let user = await User.findById(userId);
    if (user === null) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: apiStatus.AUTH_ERROR,
        message: 'Unauthorize!',
      });
    }
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'get user information successfully!',
      data: user,
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
};
