import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

const Role = mongoose.model('Role', RoleSchema);
export default Role;
