/* eslint-disable no-plusplus */
import * as cnpjValid from '@fnando/cnpj';
import Hospital from '../models/Hospital';
import HospitalBed from '../models/HospitalBed';

class HospitalController {
  async store(req, res) {
    /**
     * [x] Verificar se Hospital ja existe, ou seja se CNPJ ja existe
     * [x] Verificar se o CNPJ é valido
     * [x] Gerar Hash para senha

     * [x] Criar leitos automaticamente
     */

    const validateCnpj = cnpjValid.isValid(req.body.cnpj);

    if (!validateCnpj) return res.json({ error: 'CNPJ is not valid' });

    const hospitalExists = await Hospital.findOne({
      where: { cnpj: req.body.cnpj },
    });

    if (hospitalExists) {
      return res.status(400).json({ erro: 'Hospital already exists.' });
    }

    const { id, name, cnpj, qtd_uti, qtd_enfermaria } = await Hospital.create(
      req.body
    );

    const leitos = [];

    for (let i = 0; i < qtd_uti; i++) {
      leitos.push({ hospital_id: id, type: 'UTI', status: 'vago' });
    }
    for (let i = 0; i < qtd_enfermaria; i++) {
      leitos.push({ hospital_id: id, type: 'Enfermaria', status: 'vago' });
    }

    const leito = await HospitalBed.bulkCreate(leitos);

    return res.json({
      id,
      name,
      cnpj,
      qtd_uti,
      qtd_enfermaria,
      leito,
    });
  }
}

export default new HospitalController();
