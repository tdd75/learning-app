import express from 'express';
import {
  getGrammarTaskById,
  submitFinishTask,
} from '../controllers/grammarTask.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

const grammarTaskRoutes = express.Router();

grammarTaskRoutes.get(
  '/api/v1/user/auth/grammar-task/:taskId',
  verifyToken,
  getGrammarTaskById,
);
grammarTaskRoutes.post(
  '/api/v1/user/auth/grammar-task/submit',
  verifyToken,
  submitFinishTask,
);

export default grammarTaskRoutes;
