import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('todo_db', 'magz', 'password', {
  host: 'db',
  port: 5432,
  dialect: 'postgres',
});
