import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

// - Cadastrar hospitais = OK
// - Criptar a senha = OK
// - Login do hospital = OK
// - Authentication do hospital - OK
// - Cadastrar paciente no leito
// - Buscar paciente por CPF
// - Alterar dados do paciente
// - Liberar leito
// - Listar todos os pacientes do hospital

describe('Hospital', () => {
  let token;
  beforeEach(async () => {
    await truncate();
  });
  beforeAll(async (done) => {
    const { cnpj, password } = await factory.create('Hospital');
    request(app)
      .post('/sessions')
      .send({ cnpj, password })
      .end((err, response) => {
        token = response.body.token;
        done();
      });
  });

  it('should be able to register', async () => {
    const hospital = await factory.attrs('Hospital');
    const response = await request(app).post('/hospitals').send(hospital);

    expect(response.body).toHaveProperty('id');
  });
  it('should encrypt hospital password when new user created', async () => {
    const hospital = await factory.create('Hospital', {
      password: '123456',
    });

    const comparePassword = await bcrypt.compare(
      '123456',
      hospital.password_hash
    );

    expect(comparePassword).toBe(true);
  });
  it('should be able to logging', async () => {
    const { cnpj, password } = await factory.create('Hospital');

    const response = await request(app)
      .post('/sessions')
      .send({ cnpj, password });

    expect(response.body).toHaveProperty('token');
  });
  it('should be authorized with a token', async () => {
    const response = await request(app)
      .get('/hospitals')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
  it('should be able to register a patient', async () => {
    const patient = await factory.create('Paciente');

    // console.log(patient);

    expect();
  });
});
