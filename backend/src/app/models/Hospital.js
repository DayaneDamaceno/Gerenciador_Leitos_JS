import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Hospital extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        qtd_uti: Sequelize.INTEGER,
        qtd_enfermaria: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (hospital) => {
      if (hospital.password) {
        hospital.password_hash = await bcrypt.hash(hospital.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Hospital;
