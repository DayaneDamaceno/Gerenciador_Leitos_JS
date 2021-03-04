import * as cpfValid from '@fnando/cpf';

import Patient from '../models/Patient';
import HospitalBed from '../models/HospitalBed';

class PatientController {
  async store(req, res) {
    const { cpf, leito_id } = req.body;

    const validateCpf = cpfValid.isValid(cpf);

    if (!validateCpf) {
      return res.status(401).json({ error: 'CPF is not valid' });
    }

    const patientExists = await Patient.findOne({ where: { cpf } });

    if (patientExists) {
      return res.status(400).json({ erro: 'Patient already exists.' });
    }

    const bedAvailable = await HospitalBed.findOne({
      where: { id: leito_id, status: 'vago' },
    });

    if (!bedAvailable) {
      return res.status(401).json({ error: 'Hospital Bed not available!' });
    }

    const paciente = await Patient.create(req.body);

    if (paciente) {
      await HospitalBed.update(
        { status: 'ocupado' },
        { where: { id: leito_id } }
      );
    }

    return res.json({ paciente });
  }

  async index(req, res) {
    const { cpf } = req.query;

    return res.json({ cpf });
  }
}

export default new PatientController();
