import express from 'express';
import mongoDBConnect from './config/db.js';
import 'dotenv/config';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import vocalRouter from './routes/vocal.routes.js';
const app = express();

app.use(express.json());

//routes
app.use(userRoutes);
app.use(adminRoutes);
app.use(vocalRouter)

const PORT = process.env.SERVER_PORT || 8091;

app.listen(PORT, () => {
  console.log(`Server run in http://localhost:${PORT}`);
  mongoDBConnect();
});
