import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "magz",
  process.env.PGUSER, 
  "foobarbaz", 
  {
    host: process.env.PGHOST,
    port: 5432,
    dialect: 'postgres',
  }
);
