import express from 'express';
 
import { getAllVol,getSpecialTopicWithProcess ,getQuiz ,markDoneWord,getDoneWord,unMarkWord, getVolById, putVolById, createVol, deleteVolById, getAllTopicWithProcess } from '../controllers/vocal.controller.js';

import { isAdmin, verifyToken } from '../middleware/authJwt.js';

const vocalRouter = express.Router();


vocalRouter.get(    '/api/v1/user/vocal/process', verifyToken, getSpecialTopicWithProcess);
vocalRouter.put(    '/api/v1/user/vocal/process', verifyToken, markDoneWord);
vocalRouter.post(   '/api/v1/user/vocal/process', verifyToken, getDoneWord);
vocalRouter.delete( '/api/v1/user/vocal/process', verifyToken, unMarkWord);

vocalRouter.get(    '/api/v1/user/vocal/process-all',verifyToken, getAllTopicWithProcess);

vocalRouter.get(    '/api/v1/user/vocal/list', getAllVol);
vocalRouter.get(    '/api/v1/user/vocal', getVolById);
vocalRouter.get(    '/api/v1/user/vocal/quiz', getQuiz);

vocalRouter.put(    '/api/v1/admin/vocal', [verifyToken,isAdmin], putVolById);
vocalRouter.post(   '/api/v1/admin/vocal', [verifyToken,isAdmin], createVol);
vocalRouter.delete( '/api/v1/admin/vocal', [verifyToken,isAdmin], deleteVolById);


export default vocalRouter;
