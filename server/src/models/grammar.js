import mongoose from 'mongoose';

const GrammarSchema = new mongoose.Schema(
  {
    chapter: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    sound: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    versionKey: false,
  },
);

const Grammar = mongoose.model('Grammar', GrammarSchema);
export default Grammar;
