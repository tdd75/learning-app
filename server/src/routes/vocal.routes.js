import express from 'express';
import { getAllVol } from '../controllers/vocal.controller.js';

const vocalRouter = express.Router();

vocalRouter.get('/api/v1/user/vocal', getAllVol);

export default vocalRouter;
