import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const ChapterSchema = new mongoose.Schema(
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
ChapterSchema.plugin(mongoosePaginate);
const Chapter = mongoose.model('Chapter', ChapterSchema);
export default Chapter;
