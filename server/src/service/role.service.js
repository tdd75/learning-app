import { apiStatus, httpStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import { Role } from '../models/index.js';

const RoleService = {};

RoleService.findRoleByName = async (roleName) => {
  let role = await Role.findOne({ name: roleName });
  if (!role) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      apiStatus.DATABASE_ERROR,
      `Role not found with name: ${roleName}`,
    );
  }
  return role;
};

RoleService.findRoleById = async (roleId) => {
  let role = await Role.findById(roleId);
  if (!role) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      apiStatus.DATABASE_ERROR,
      `Role not found with id: ${roleId}`,
    );
  }
  return role;
};

RoleService.addRole = async (role) => {
  await role.save((err, role) => {
    if (err) {
      throw new CustomError(
        httpStatus.INTERNAL_SERVER_ERROR,
        apiStatus.DATABASE_ERROR,
        `Error when save role: ${err.message}`,
      );
    } else return role;
  });
};

export default RoleService;
