import express from 'express';
import {
  addGrammarTask,
  deleteGrammarTask,
  getGrammarTaskById,
  getListTaskByTopicWithPagination,
  getListTaskWithPagination,
  submitFinishTask,
  updateGrammarTask,
} from '../controllers/grammarTask.controller.js';
import { isAdmin, verifyToken } from '../middleware/authJwt.js';

const grammarTaskRoutes = express.Router();


grammarTaskRoutes.get(
  '/api/v1/user/auth/grammar-task/:taskId',
  getGrammarTaskById,
);

grammarTaskRoutes.get(
  '/api/v1/admin/grammar-task', 
  getListTaskWithPagination
);

// usersubmit Done task
grammarTaskRoutes.post(
  '/api/v1/user/auth/grammar-task/submit',
  verifyToken,
  submitFinishTask,
);


// crud gTask
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
  getListTaskByTopicWithPagination
);
export default grammarTaskRoutes;
