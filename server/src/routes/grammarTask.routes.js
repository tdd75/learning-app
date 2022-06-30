import express from 'express';
import {
  addGrammarTask,
  deleteGrammarTask,
  getGrammarTaskById,
  getListTaskByTopicWithPagination,
  submitFinishTask,
  updateGrammarTask,
} from '../controllers/grammarTask.controller.js';
import { isAdmin, verifyToken } from '../middleware/authJwt.js';

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

grammarTaskRoutes.post(
  '/api/v1/admin/auth/grammar-task',
  [verifyToken, isAdmin],
  addGrammarTask,
);
grammarTaskRoutes.put(
  '/api/v1/admin/auth/grammar-task/:taskId',
  [verifyToken, isAdmin],
  updateGrammarTask,
);
grammarTaskRoutes.delete(
  '/api/v1/admin/auth/grammar-task/:taskId',
  [verifyToken, isAdmin],
  deleteGrammarTask,
);
grammarTaskRoutes.get(
  '/api/v1/admin/auth/grammar-task/by-topic',
  [verifyToken, isAdmin],
  getListTaskByTopicWithPagination
);
export default grammarTaskRoutes;
