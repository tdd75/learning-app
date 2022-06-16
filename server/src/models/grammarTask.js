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
    collection: 'grammar_tasks',
  },
);

const GrammarTask = mongoose.model('GrammarTask', GrammarTaskSchema);
export default GrammarTask;
