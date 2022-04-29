import mongoose from 'mongoose';

const mongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connect to MongoDB successfully!');
  } catch (error) {
    console.log('Error when connect to MongoDB: ', error);
  }
};
export default mongoDBConnect;
