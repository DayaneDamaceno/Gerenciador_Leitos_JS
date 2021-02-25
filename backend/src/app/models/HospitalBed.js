import Sequelize, { Model } from 'sequelize';

class HospitalBed extends Model {
  static init(sequelize) {
    super.init(
      {
        type: Sequelize.STRING,
        status: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Hospital, {
      foreignKey: 'hospital_id',
      as: 'hospital',
    });
  }
}

export default HospitalBed;
