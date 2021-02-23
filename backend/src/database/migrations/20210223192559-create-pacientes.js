module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pacientes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      leito_id: {
        type: Sequelize.INTEGER,
        references: { model: 'leitos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      data_nascimento: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      entrada: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      saida: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('pacientes');
  },
};
