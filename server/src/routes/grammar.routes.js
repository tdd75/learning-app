import express from 'express';
import {
  getGrammarById,
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

export default grammarRoutes;
