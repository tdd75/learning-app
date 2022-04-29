import mongoose from 'mongoose';

const mongoDBConnect = async () => {
  mongoose.Promise = global.Promise;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connect to MongoDB successfully!');
  } catch (error) {
    console.log('Error when connect to MongoDB: ', error);
  }
};
export default mongoDBConnect;
