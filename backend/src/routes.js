// todas as rotas da nossa aplicação, e middlewares necessários.

import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({ message: 'será?' });
});

export default routes;
