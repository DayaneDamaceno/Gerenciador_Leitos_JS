module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hospitais', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      qtd_enfermaria: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      qtd_uti: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('hospitais');
  },
};
