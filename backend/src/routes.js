// todas as rotas da nossa aplicação, e middlewares necessários.

import { Router } from 'express';

import HospitalController from './app/controllers/HospitalController';
import SessionController from './app/controllers/SessionController';
import PatientController from './app/controllers/PatientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/hospitals', HospitalController.store);
routes.post('/sessions', SessionController.store);

routes.post('/patients', PatientController.store);
routes.get('/patients', PatientController.index);
routes.put('/patients/:id', PatientController.update);
routes.delete('/patients/:id', PatientController.delete);

routes.use(authMiddleware);

routes.get('/hospitals', (req, res) =>
  res.json({
    message: 'ENTROU',
  })
);

export default routes;
