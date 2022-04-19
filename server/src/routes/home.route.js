import { Router } from 'express';
import { getHome } from '../controllers/home.controller.js';

const route = Router();

route.get('/', getHome);

export default route;
