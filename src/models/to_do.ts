import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('todo', 'magz', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

export const ToDo = sequelize.define('todo', {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
});

