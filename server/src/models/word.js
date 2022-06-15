import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    suggest: {
      type: String,
      required: true,
    },
    sound: {
      type: String,
    },
    image: {
      type: String,
    },
    transcription: {
      type: String,
    },
    explanation: {
      type: String,
    },
    meaningSound: {
      type: String,
    },
    exampleSound: {
      type: String,
    },
    fullVietnamese: {
      type: String,
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

const Word = mongoose.model('Word', WordSchema);
export default Word;
