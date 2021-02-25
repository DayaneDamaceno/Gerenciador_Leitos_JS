import Sequelize from 'sequelize';

import Hospital from '../app/models/Hospital';

import databaseConfig from '../config/database';

const models = [Hospital];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
