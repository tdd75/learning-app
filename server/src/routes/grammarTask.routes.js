import express from 'express';
import {
  addGrammarTask,
  deleteGrammarTask,
  getAllTopicWithProcess,
  getGrammarTaskById,
  getListTaskByTopicWithPagination,
  getListTaskWithPagination,
  markDoneTask,
  // submitFinishTask,
  updateGrammarTask,
} from '../controllers/grammarTask.controller.js';
import { isAdmin, verifyToken } from '../middleware/authJwt.js';

const grammarTaskRoutes = express.Router();


grammarTaskRoutes.get(
  '/api/v1/user/auth/grammar-task',
  getGrammarTaskById,
);

grammarTaskRoutes.get(
  '/api/v1/admin/grammar-task', 
  getListTaskWithPagination
);

// // usersubmit Done task
// grammarTaskRoutes.post(
//   '/api/v1/user/auth/grammar-task/submit',
//   verifyToken,
//   submitFinishTask,
// );


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

grammarTaskRoutes.post(
  '/api/v1/user/auth/grammar-task/submit',
  verifyToken,
  markDoneTask
);

grammarTaskRoutes.get(
  '/api/v1/user/auth/grammar-task/list',
  verifyToken,
  getAllTopicWithProcess
);
export default grammarTaskRoutes;
