import express from 'express';
 
import { getAllVol,getSpecialTopicWithProcess ,markDoneWord,getDoneWord,unMarkWord, getVolById, putVolById, createVol, deleteVolById, getAllTopicWithProcess } from '../controllers/vocal.controller.js';

import { verifyToken } from '../middleware/authJwt.js';

const vocalRouter = express.Router();


vocalRouter.get(    '/api/v1/user/vocal/process', verifyToken, getSpecialTopicWithProcess);
vocalRouter.put(    '/api/v1/user/vocal/process', verifyToken, markDoneWord);
vocalRouter.post(   '/api/v1/user/vocal/process', verifyToken, getDoneWord);
vocalRouter.delete( '/api/v1/user/vocal/process', verifyToken, unMarkWord);

vocalRouter.get(    '/api/v1/user/vocal/process-all',verifyToken, getAllTopicWithProcess);

vocalRouter.get(    '/api/v1/user/vocal/list', getAllVol);
vocalRouter.get(    '/api/v1/user/vocal', getVolById);
vocalRouter.put(    '/api/v1/admin/vocal', verifyToken, putVolById);
vocalRouter.post(   '/api/v1/admin/vocal', verifyToken, createVol);
vocalRouter.delete( '/api/v1/admin/vocal', verifyToken, deleteVolById);


export default vocalRouter;
