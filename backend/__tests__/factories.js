import faker from 'faker';
import { factory } from 'factory-girl';
import * as cnpjValidates from '@fnando/cnpj';
import * as cpfValidates from '@fnando/cpf';

import Hospital from '../src/app/models/Hospital';
import HospitalBed from '../src/app/models/HospitalBed';
import Patient from '../src/app/models/Patient';

factory.define('Hospital', Hospital, {
  name: faker.company.companyName(),
  cnpj: cnpjValidates.generate(true),
  password: faker.internet.password,
  qtd_uti: faker.random.number(10),
  qtd_enfermaria: faker.random.number(10),
});

factory.define('Leito', HospitalBed, {
  type: 'UTI',
  status: 'vago',
  hospital_id: factory.assoc('Hospital', 'id'),
});

factory.define('Paciente', Patient, {
  name: faker.company.companyName(),
  hospital_id: factory.assoc('Hospital', 'id'),
  leito_id: factory.assoc('Leito', 'id'),
  cpf: cpfValidates.generate(true),
  data_nascimento: faker.date.past(),
  estado: 'Grave',
});

export default factory;
