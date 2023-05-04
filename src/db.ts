import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER, 
  process.env.PGPASSWORD, 
  {
    host: 'db',
    port: 5432,
    dialect: 'postgres',
  }
);
