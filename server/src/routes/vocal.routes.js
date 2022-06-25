import express from 'express';
import { getAllVol,getVolByTopic, markDoneTopic, getDoneTopic,unMarkTopic } from '../controllers/vocal.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

const vocalRouter = express.Router();

vocalRouter.get('/api/v1/user/vocal/list', getAllVol);
vocalRouter.get('/api/v1/user/vocal/topic', getVolByTopic);
vocalRouter.put('/api/v1/user/vocal/topic', verifyToken, markDoneTopic);
vocalRouter.post('/api/v1/user/vocal/topic', verifyToken, getDoneTopic);
vocalRouter.delete('/api/v1/user/vocal/topic', verifyToken, unMarkTopic);

export default vocalRouter;
