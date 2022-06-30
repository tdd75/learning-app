import express from 'express';
import {
  addGrammar,
  deleteGrammar,
  getGrammarById,
  getListChapter,
  getListGrammarByChapter,
  getListGrammarWithPaginationAndKeyword,
  submitFinishedGrammar,
  updateGrammar,
} from '../controllers/grammar.controller.js';
import { isAdmin, verifyToken } from '../middleware/authJwt.js';

const grammarRoutes = express.Router();

grammarRoutes.get('/api/v1/user/auth/grammar/:grammarId', verifyToken, getGrammarById);
grammarRoutes.post(
  '/api/v1/user/auth/grammar/submit',
  verifyToken,
  submitFinishedGrammar,
);
grammarRoutes.get(
  '/api/v1/admin/auth/grammar/chapter/list',
  [verifyToken, isAdmin],
  getListChapter,
);
grammarRoutes.post('/api/v1/admin/auth/grammar', [verifyToken, isAdmin], addGrammar);
grammarRoutes.put(
  '/api/v1/admin/auth/grammar/:grammarId',
  [verifyToken, isAdmin],
  updateGrammar,
);
grammarRoutes.delete(
  '/api/v1/admin/auth/grammar/:grammarId',
  [verifyToken, isAdmin],
  deleteGrammar,
);
grammarRoutes.get('/api/v1/admin/auth/grammar/by-chapter', [verifyToken, isAdmin], getListGrammarByChapter);
grammarRoutes.get('/api/v1/user/grammar', getListGrammarWithPaginationAndKeyword);
export default grammarRoutes;
