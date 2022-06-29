import express from 'express';
import {
  getGrammarById,
  getListChapter,
  submitFinishedGrammar,
} from '../controllers/grammar.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

const grammarRoutes = express.Router();

grammarRoutes.get('/api/v1/user/auth/grammar/:grammarId', verifyToken, getGrammarById);
grammarRoutes.post(
  '/api/v1/user/auth/grammar/submit',
  verifyToken,
  submitFinishedGrammar,
);
grammarRoutes.get('/api/v1/user/auth/grammar/chapter/list', verifyToken, getListChapter);
export default grammarRoutes;
