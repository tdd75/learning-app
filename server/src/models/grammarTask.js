import mongoose from 'mongoose';

const GrammarTaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    trueAnswer: {
      type: Number,
      required: true,
    },
    listAnswer: {
      type: mongoose.Schema.Types.Array,
      required: true,
    },
    comment: {
      type: String,
    },
    topic: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

const GrammarTask = mongoose.model('GrammarTask', GrammarTaskSchema);
export default GrammarTask;
