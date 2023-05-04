import { QueryInterface, DataTypes } from 'sequelize';

export const up = async function(queryInterface: QueryInterface) {
  await queryInterface.createTable('todos', { 
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    updatedAt: DataTypes.TIME,
    createdAt: DataTypes.TIME  
  });
}

export const down = async function (queryInterface: QueryInterface) {
  await queryInterface.dropTable('todos');
}
