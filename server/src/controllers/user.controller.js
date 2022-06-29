import bcrypt from 'bcryptjs';
import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import UserService from '../service/user.service.js';

const  { compareSync, hashSync } = bcrypt;
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

export const updateUserProfile = async (req, res) => {
  try{
    let userId = req.userId;
    let updateRequest = req.body;
    let updateUser = await UserService.updateUserProfile(userId, updateRequest);
    updateUser.password = "";
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: "update user profile successfully",
      data: updateUser
    });
  }catch(err){
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
}

export const changePassword = async (req, res) => {
  try{
    let userId = req.userId;
    let oldPass = req.body.oldPassword;
    let newPass = req.body.newPassword;

    //check valid old password
    let user = await UserService.findUserById(userId);
    if(!compareSync(oldPass, user.password)){
      return res.status(httpStatus.BAD_REQUEST).send({
        status: apiStatus.INVALID_PARAM,
        message: "Incorrect old password"
      });
    }else {
      user.password = hashSync(newPass);
      let updateUser = await UserService.updateUser(user);
      return res.status(httpStatus.OK).send({
        status: apiStatus.SUCCESS,
        message: "change password successfully",
        data: updateUser
      });
    }
  }catch(err){
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
}