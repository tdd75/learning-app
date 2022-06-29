import express from 'express';
import { getAllVol,getVolByTopic, markDoneTopic, getDoneTopic,unMarkTopic, getVolById, putVolById, createVol, deleteVolById } from '../controllers/vocal.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

const vocalRouter = express.Router();

vocalRouter.get('/api/v1/user/vocal/list', getAllVol);
vocalRouter.get('/api/v1/user/vocal/topic', getVolByTopic);
vocalRouter.put('/api/v1/user/vocal/topic', verifyToken, markDoneTopic);
vocalRouter.post('/api/v1/user/vocal/topic', verifyToken, getDoneTopic);
vocalRouter.delete('/api/v1/user/vocal/topic', verifyToken, unMarkTopic);

vocalRouter.get('/api/v1/user/vocal', getVolById);
vocalRouter.put('/api/v1/user/vocal', verifyToken, putVolById);
vocalRouter.post('/api/v1/user/vocal', verifyToken, createVol);
vocalRouter.delete('/api/v1/user/vocal', verifyToken, deleteVolById);


export default vocalRouter;
