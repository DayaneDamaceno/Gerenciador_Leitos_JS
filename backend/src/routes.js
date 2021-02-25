// todas as rotas da nossa aplicação, e middlewares necessários.

import { Router } from 'express';

import HospitalController from './app/controllers/HospitalController';

const routes = new Router();

routes.post('/hospitals', HospitalController.store);

export default routes;
