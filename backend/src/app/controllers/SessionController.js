/**
 * jwt
 * authConfig
 * model Hospital.
 *
 * verificar se CNPJ existe no banco
 * checar a senha
 *
 * retornar token
 */
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import Hospital from '../models/Hospital';

class SessionController {
  async store(req, res) {
    const { cnpj, password } = req.body;

    const hospital = await Hospital.findOne({
      where: { cnpj },
    });

    if (!hospital) {
      return res.status(401).json({ error: 'Hospital not found' });
    }

    if (!(await hospital.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = hospital;

    return res.json({
      user: {
        id,
        name,
        cnpj,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
