import Sequelize, { Model } from 'sequelize';

class Hospital extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        qtd_uti: Sequelize.INTEGER,
        qtd_enfermaria: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default Hospital;
