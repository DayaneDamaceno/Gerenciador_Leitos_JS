import Sequelize from 'sequelize';

import Hospital from '../app/models/Hospital';
import HospitalBed from '../app/models/HospitalBed';

import databaseConfig from '../config/database';

const models = [Hospital, HospitalBed];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
