import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "magz",
  "main", 
  "foobarbaz", 
  {
    host: process.env.PGHOST,
    port: 5432,
    dialect: 'postgres',
  }
);
