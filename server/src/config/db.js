import mongoose from 'mongoose';
// import { Roles } from '../constants/index.js';
// import { Role } from '../models/index.js';
// import RoleService from '../service/role.service.js';

const mongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connect to MongoDB successfully!');

    // init role data => run in first run
    // saveRole(Roles.USER);
    // saveRole(Roles.ADMIN);
    // console.log('Initial Database successfully!');
  } catch (error) {
    console.log('Error when connect to MongoDB: ', error);
  }
};
export default mongoDBConnect;

// const saveRole = async (roleName) => {
//   let newRole = new Role({
//     name: roleName
//   });
//   await RoleService.addRole(newRole);
// }
