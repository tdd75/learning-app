import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    },
    avatarUrl: {
      type: String,
      default: 'avt_default.png',
    },
    progressVocabulary: {
      type: mongoose.Schema.Types.Array,
      required: true,
      default: []
    },
    progressGrammar: {
      type: mongoose.Schema.Types.Array,
      required: true,
      default: []
    },
    progressGrammarTask: {
      type: mongoose.Schema.Types.Array,
      required: true,
      default: []
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

const User = mongoose.model('User', UserSchema);
export default User;
