module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gerenciador',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

// timestamps: true
// criar as tabelas created_at e updated_at automaticamente
