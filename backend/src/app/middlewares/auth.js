/**
 * criação de um trecho de cód que verifica se o token é valido
 *
 * jwt
 * promisify
 *
 * função que pega o token do header (se não existir erro)
 * try catch descodificar o token e retornar o id se n for valido erro no catch
 * se for valido next();
 *
 * (não esqueça de usar o middleware em rotas privadas)
 */
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.hospitalId = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
