import { DataTypes } from 'sequelize';
import { sequelize } from "../db";

export const ToDo = sequelize.define('todo', {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
});

