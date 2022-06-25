import express from 'express';
import mongoDBConnect from './config/db.js';
import 'dotenv/config';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import vocalRouter from './routes/vocal.routes.js'; 
import homeRouter from './routes/home.routes.js'; 
import grammarRoutes from './routes/grammar.routes.js';
import grammarTaskRoutes from './routes/grammarTask.routes.js'; 
const app = express();

app.use(express.json());

//routes
app.use(userRoutes);
app.use(adminRoutes); 
app.use(vocalRouter);
app.use(grammarRoutes);
app.use(grammarTaskRoutes);
app.use(homeRouter) 

const PORT = process.env.SERVER_PORT || 8091;

app.listen(PORT, () => {
  console.log(`Server run in http://localhost:${PORT}`);
  mongoDBConnect();
});
