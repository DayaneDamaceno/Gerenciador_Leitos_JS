import request from 'supertest';
// import bcrypt from 'bcryptjs';
import app from '../../src/app';

// import factory from '../factories';
import truncate from '../util/truncate';

describe('Hospital', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app).post('/hospitals').send({
      name: 'Hospital Teste',
      cnpj: '69.968.241/0001-25',
      password: 'acesso',
      qtd_uti: 5,
      qtd_enfermaria: 10,
    });

    expect(response.body).toHaveProperty('id');
  });
});
