import { User, Otp } from '../models/index.js';
import { httpStatus, apiStatus, Roles } from '../constants/index.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateOtp } from '../utils/stringUtils.js';
import { transporter } from '../config/mail.js';
import UserService from '../service/user.service.js';
import CustomError from '../error/custom.error.js';
import RoleService from '../service/role.service.js';
import OtpService from '../service/otp.service.js';

const { hashSync, compareSync } = bcrypt;
const { sign } = jwt;
const refreshTokens = {};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: apiStatus.INVALID_PARAM,
        message: 'Invalid params',
        error: errors.array(),
      });
    }
    //check email is used?
    await UserService.findUserByEmail(req.body.email);
    return res.status(httpStatus.BAD_REQUEST).send({
      status: apiStatus.INVALID_PARAM,
      message: 'Email is already used! Try another',
    });
  } catch (err) {
    //email is not exist => can create user
    if (err instanceof CustomError) {
      try {
        let userRole = await RoleService.findRoleByName(Roles.USER);
        const newUser = new User({
          email: req.body.email,
          username: req.body.username,
          password: hashSync(req.body.password),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          role: userRole._id,
        });

        //add user to database
        await UserService.addUSer(newUser);
        return res.status(httpStatus.OK).send({
          status: apiStatus.SUCCESS,
          message: 'User was registered successfully',
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
    }
  }
};

export const signin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: apiStatus.INVALID_PARAM,
        message: 'Invalid params',
        error: errors.array(),
      });
    }

    //find user by email
    let user = await UserService.findUserByEmail(req.body.email);

    //check valid password
    const passwordIsValid = compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: apiStatus.AUTH_ERROR,
        message: 'Incorrect password!',
      });
    }

    //check role existed
    if (user.role.name === Roles.ADMIN) {
      return res.status(httpStatus.FORBIDDEN).send({
        status: apiStatus.AUTH_ERROR,
        message: 'USER role is allowed only!',
      });
    }

    //sign token
    const userInfo = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    var token = sign(userInfo, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    var refreshToken = sign(userInfo, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });

    refreshTokens[refreshToken] = userInfo;

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'Login successfully',
      data: {
        token: token,
        tokenExpire: parseInt(process.env.TOKEN_EXPIRATION.replace('s', '')),
        refreshToken: refreshToken,
        refreshTokenExpire: parseInt(
          process.env.REFRESH_TOKEN_EXPIRATION.replace('s', ''),
        ),
      },
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
export const signinAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: apiStatus.INVALID_PARAM,
        message: 'Invalid params',
        error: errors.array(),
      });
    }

    //find user by email
    let user = await UserService.findUserByEmail(req.body.email);

    const passwordIsValid = compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: apiStatus.AUTH_ERROR,
        message: 'Incorrect password!',
      });
    }
    if (user.role.name === Roles.USER) {
      return res.status(httpStatus.FORBIDDEN).send({
        status: apiStatus.AUTH_ERROR,
        message: 'ADMIN role is allowed only!',
      });
    }
    const userInfo = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    var token = sign(userInfo, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    var refreshToken = sign(userInfo, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });

    refreshTokens[refreshToken] = userInfo;

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'Login successfully',
      data: {
        token: token,
        tokenExpire: parseInt(process.env.TOKEN_EXPIRATION),
        refreshToken: refreshToken,
        refreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
      },
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

export const refreshToken = async (req, res) => {
  let refreshToken = req.body.refreshToken;
  if (refreshToken && refreshToken in refreshTokens) {
    const userInfo = refreshTokens[refreshToken];

    var token = sign(userInfo, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    refreshToken = sign(userInfo, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'refresh token successfully',
      data: {
        token: token,
        tokenExpire: parseInt(process.env.TOKEN_EXPIRATION),
        refreshToken: refreshToken,
        refreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
      },
    });
  } else {
    return res.status(httpStatus.UNAUTHORIZED).send({
      status: apiStatus.AUTH_ERROR,
      message: 'refresh token is required in body',
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const to = req.body.to;
    let user = await UserService.findUserByEmail(to);
    if (!user || user.role.name === Roles.ADMIN) {
      return res.status(httpStatus.NOT_FOUND).send({
        status: apiStatus.INVALID_PARAM,
        message: 'Email is not existed!',
      });
    }
    const otpValue = generateOtp();
    const mailData = {
      from: process.env.MAIL_USERNAME,
      to: to,
      subject: 'English Learning App Verify Forgot Password',
      html: `<div><span>Your verification code is </span><strong> E - ${otpValue}</strong><span>. Please do not share this code with anyone.</span></div>`,
    };
    transporter.sendMail(mailData, async (error, info) => {
      if (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          status: apiStatus.MAIL_ERROR,
          message: `Error when send email: ${error.message}`,
        });
      }
      let otp = {
        createAt: Date.now(),
        updateAt: Date.now(),
        otpValue: otpValue,
        usedOk: 0,
        timeStart: Date.now(),
        timeEnd: Date.now() + 120000,
        userId: user.id,
      };
      await OtpService.addOtp(otp);
      return res.status(httpStatus.OK).send({
        status: apiStatus.SUCCESS,
        message: 'send email with otp to user successfully',
        data: {
          userId: user.id,
          mailId: info.messageId,
        },
      });
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

export const forgotPasswordAdmin = async (req, res) => {
  try {
    const to = req.body.to;
    let user = await UserService.findUserByEmail(to);

    //generate Otp
    const otpValue = generateOtp();
    const mailData = {
      from: process.env.MAIL_USERNAME,
      to: to,
      subject: 'English Learning App Verify Forgot Password',
      html: `<div><span>Your verification code is </span><strong> E - ${otpValue}</strong><span>. Please do not share this code with anyone.</span></div>`,
    };
    transporter.sendMail(mailData, async (error, info) => {
      if (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          status: apiStatus.MAIL_ERROR,
          message: `Error when send email: ${error.message}`,
        });
      }
      let otp = {
        createAt: Date.now(),
        updateAt: Date.now(),
        otpValue: otpValue,
        usedOk: 0,
        timeStart: Date.now(),
        timeEnd: Date.now() + 120000,
        userId: user.id,
      };
      await OtpService.addOtp(otp);
      return res.status(httpStatus.OK).send({
        status: apiStatus.SUCCESS,
        message: 'send email with otp to user successfully',
        data: {
          userId: user.id,
          mailId: info.messageId,
        },
      });
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

export const verifyOtp = async (req, res) => {
  try {
    const otpValue = req.body.otpValue;
    const userId = req.body.userId;

    //check exist user
    const user = await UserService.findUserById(userId);

    //get otp
    const otp = await OtpService.findOtpByValueAndStatus(userId, otpValue);
    if (Date.now() < otp.timeEnd) {
      await Otp.findOneAndUpdate({ _id: otp.id }, { usedOk: 1 });
      return res.status(httpStatus.OK).send({
        status: apiStatus.SUCCESS,
        message: 'verify otp success!',
        data: user,
      });
    }
    return res.status(httpStatus.UNAUTHORIZED).send({
      status: apiStatus.INVALID_PARAM,
      message: 'Otp is expired!',
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
