import express from 'express';
import { getAllVol,getVolByTopic } from '../controllers/vocal.controller.js';

const vocalRouter = express.Router();

vocalRouter.get('/api/v1/user/vocal/list', getAllVol);
vocalRouter.get('/api/v1/user/vocal/topic', getVolByTopic);

export default vocalRouter;
