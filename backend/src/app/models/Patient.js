import Sequelize, { Model } from 'sequelize';

class Patient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        data_nascimento: Sequelize.DATE,
        estado: Sequelize.STRING,
        saida: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.HospitalBed, {
      foreignKey: 'leito_id',
      as: 'leito',
    });
    this.belongsTo(models.Hospital, {
      foreignKey: 'hospital_id',
      as: 'hospital',
    });
  }
}

export default Patient;
