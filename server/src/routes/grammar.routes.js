import express from 'express';
import {
  addGrammar,
  deleteGrammar,
  getGrammarById,
  getListGrammarByChapter,
  getListGrammarWithPaginationAndKeyword,
  updateGrammar,
} from '../controllers/grammar.controller.js';
import { isAdmin, verifyToken } from '../middleware/authJwt.js';

const grammarRoutes = express.Router();

grammarRoutes.get('/api/v1/user/auth/grammar', verifyToken, getGrammarById);

grammarRoutes.post('/api/v1/admin/auth/grammar', [verifyToken, isAdmin], addGrammar);
grammarRoutes.put(
  '/api/v1/user/auth/grammar/:grammarId',
  [verifyToken],
  updateGrammar,
);
grammarRoutes.delete(
  '/api/v1/admin/auth/grammar/:grammarId',
  [verifyToken, isAdmin],
  deleteGrammar,
);
grammarRoutes.get('/api/v1/user/auth/grammar/by-chapter', verifyToken, getListGrammarByChapter);
grammarRoutes.get('/api/v1/user/grammar', getListGrammarWithPaginationAndKeyword);
grammarRoutes.get('/api/v1/admin/auth/grammar', [verifyToken, isAdmin] ,getListGrammarWithPaginationAndKeyword);
export default grammarRoutes;
