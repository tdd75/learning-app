import { apiStatus, httpStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import { User } from '../models/index.js';

const UserService = {};

UserService.findUserById = async (userId) => {
  let user = await User.findById(userId);
  if (!user) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      apiStatus.DATABASE_ERROR,
      `User not found with id: ${userId}`,
    );
  }
  return user;
};

UserService.findUserByEmail = async (email) => {
  let user = await User.findOne({ email: email }).populate('role');
  if (!user) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      apiStatus.DATABASE_ERROR,
      `User not found with email: ${email}`,
    );
  }
  return user;
};

UserService.addUSer = async (user) => {
  await user.save((err, user) => {
    if (err) {
      throw new CustomError(
        httpStatus.INTERNAL_SERVER_ERROR,
        apiStatus.DATABASE_ERROR,
        `Error when save user: ${err.message}`,
      );
    } else return user;
  });
};
export default UserService;