// todas as rotas da nossa aplicação, e middlewares necessários.

import { Router } from 'express';

import Hospital from './app/models/Hospital';

const routes = new Router();

routes.get('/', async (req, res) => {
  const hospital = await Hospital.create({
    name: 'UPA Alvares',
    cnpj: '82.466.215/0001-67',
    password_hash: '1213123sa',
    qtd_uti: 3,
    qtd_enfermaria: 5,
  });

  return res.json(hospital);
});

export default routes;
