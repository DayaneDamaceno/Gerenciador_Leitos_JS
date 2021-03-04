import * as cpfValid from '@fnando/cpf';
import { format } from 'date-fns';

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

    const validateCpf = cpfValid.isValid(cpf);

    if (!validateCpf) {
      return res.status(401).json({ error: 'CPF is not valid' });
    }

    const patient = await Patient.findOne({
      where: { cpf },
      include: [
        {
          model: HospitalBed,
          as: 'leito',
          attributes: ['type'],
        },
      ],
    });

    if (!patient) {
      return res.status(401).json({ error: 'Patient not found!' });
    }

    const { name, data_nascimento, estado, createdAt, saida, leito } = patient;

    const data_nascimento_format = format(data_nascimento, 'dd/MM/yyyy');
    const created_at_format = format(createdAt, 'dd/MM/yyyy HH:mm');
    const saida_format = saida ? format(saida, 'dd/MM/yyyy HH:mm') : null;

    return res.json({
      name,
      cpf,
      data_nascimento_format,
      estado,
      entrada: created_at_format,
      saida: saida_format,
      leito,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, data_nascimento, estado } = req.body;

    const patient = await Patient.findOne({ where: { id } });

    if (!patient) {
      return res.status(401).json({ error: 'Patient not found' });
    }

    await patient.update({ name, data_nascimento, estado });

    return res.json({ message: 'Patient updated successfully' });
  }
}

export default new PatientController();
