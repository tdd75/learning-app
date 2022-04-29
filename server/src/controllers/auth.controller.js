import { User, Role } from '../models/index.js';
import { httpStatus, apiStatus } from '../constants/index.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateNewPassword } from '../utils/stringUtils.js';
import { transporter } from '../config/mail.js';

const { hashSync, compareSync } = bcrypt;
const { sign } = jwt;
const refreshTokens = {};

export const register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: apiStatus.INVALID_PARAM,
      message: 'Invalid params',
      error: errors.array(),
    });
  }
  User.findOne({ email: req.body.email }).then((checkUser) => {
    if (checkUser) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: apiStatus.INVALID_PARAM,
        message: 'Email is already used! Try another',
      });
    }

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashSync(req.body.password),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    newUser.save((err, newUser) => {
      if (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          status: apiStatus.DATABASE_ERROR,
          message: 'Error when save user: ' + err,
        });
      }

      Role.findOne({ name: 'USER' }, (err, role) => {
        if (err) {
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.DATABASE_ERROR,
            message: 'Error when find role: ' + err,
          });
        }

        newUser.role = role._id;
        newUser.save((err) => {
          if (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
              status: apiStatus.DATABASE_ERROR,
              message: 'Error when save user: ' + err,
            });
          }

          console.log('registration info: ', newUser);
          return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'User was registered successfully',
          });
        });
      });
    });
  });
};

export const signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: apiStatus.INVALID_PARAM,
      message: 'Invalid params',
      error: errors.array(),
    });
  }
  User.findOne({
    email: req.body.email,
  })
    .populate('role')
    .exec((err, user) => {
      if (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          status: apiStatus.DATABASE_ERROR,
          message: err.message,
        });
      }
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).send({
          status: apiStatus.INVALID_PARAM,
          message: 'User not found!',
        });
      }
      const passwordIsValid = compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(httpStatus.UNAUTHORIZED).send({
          status: apiStatus.AUTH_ERROR,
          message: 'Incorrect password!',
        });
      }
      if (user.role.name === 'ADMIN') {
        return res.status(httpStatus.FORBIDDEN).send({
          status: apiStatus.AUTH_ERROR,
          message: 'USER role is allowed only!',
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
          tokenExpire: parseInt(process.env.TOKEN_EXPIRATION.replace('s', '')),
          refreshToken: refreshToken,
          refreshTokenExpire: parseInt(
            process.env.REFRESH_TOKEN_EXPIRATION.replace('s', ''),
          ),
        },
      });
    });
};
export const signinAdmin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: apiStatus.INVALID_PARAM,
      message: 'Invalid params',
      error: errors.array(),
    });
  }
  User.findOne({
    email: req.body.email,
  })
    .populate('role')
    .exec((err, user) => {
      if (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          status: apiStatus.DATABASE_ERROR,
          message: err.message,
        });
      }
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).send({
          status: apiStatus.INVALID_PARAM,
          message: 'User not found!',
        });
      }
      const passwordIsValid = compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(httpStatus.UNAUTHORIZED).send({
          status: apiStatus.AUTH_ERROR,
          message: 'Incorrect password!',
        });
      }
      if (user.role.name === 'USER') {
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
          tokenExpire: parseInt(process.env.TOKEN_EXPIRATION.replace('s', '')),
          refreshToken: refreshToken,
          refreshTokenExpire: parseInt(
            process.env.REFRESH_TOKEN_EXPIRATION.replace('s', ''),
          ),
        },
      });
    });
};

export const refreshToken = (req, res) => {
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
        tokenExpire: parseInt(process.env.TOKEN_EXPIRATION.replace('s', '')),
        refreshToken: refreshToken,
        refreshTokenExpire: parseInt(
          process.env.REFRESH_TOKEN_EXPIRATION.replace('s', ''),
        ),
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
    const user = await User.findOne({
      email: to,
    });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).send({
        status: apiStatus.INVALID_PARAM,
        message: 'Email is not existed!',
      });
    }
    const newPassword = generateNewPassword();
    const mailData = {
      from: process.env.MAIL_USERNAME,
      to: to,
      subject: 'English Learning App Reset Password',
      html: `<div><span>Your new password is </span><strong>${newPassword}</strong><span>. Please change password after logging in</span></div>`,
    };
    transporter.sendMail(mailData, async (error, info) => {
      if (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          status: apiStatus.MAIL_ERROR,
          message: `Error when send email: ${error.message}`,
        });
      }
      await User.findOneAndUpdate(
        {
          id: user.id,
        },
        {
          password: hashSync(newPassword),
        },
      );
      return res.status(httpStatus.OK).send({
        status: apiStatus.SUCCESS,
        message: 'update password and send email to user successfully',
        data: info,
      });
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
};

export const forgotPasswordAdmin = async (req, res) => {
  try {
    const to = req.body.to;
    await User.findOne({
      email: to,
    })
      .populate('role')
      .exec((err, user) => {
        if (err) {
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.DATABASE_ERROR,
            message: err.message,
          });
        }
        if (!user || user.role.name === 'USER') {
          return res.status(httpStatus.NOT_FOUND).send({
            status: apiStatus.INVALID_PARAM,
            message: 'Email is not existed!',
          });
        }
        const newPassword = generateNewPassword();
        const mailData = {
          from: process.env.MAIL_USERNAME,
          to: to,
          subject: 'English Learning App Reset Password For Admin User',
          html: `<div><span>Your new password is </span><strong>${newPassword}</strong><span>. Please change password after logging in</span></div>`,
        };
        transporter.sendMail(mailData, async (error, info) => {
          if (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
              status: apiStatus.MAIL_ERROR,
              message: `Error when send email: ${error.message}`,
            });
          }
          await User.findOneAndUpdate(
            {
              id: user.id,
            },
            {
              password: hashSync(newPassword),
            },
          );
          return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'update password and send email to user successfully',
            data: info,
          });
        });
      });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
};
