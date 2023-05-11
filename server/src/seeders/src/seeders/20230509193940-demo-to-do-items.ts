import { QueryInterface, Sequelize } from 'sequelize/types';


export const up = async function(queryInterface: QueryInterface, sequelize: Sequelize) {
     await queryInterface.bulkInsert('ToDoItems', [{
        name: 'first todo',
        description: 'here is a todo item',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {})
}

export const down = async function(queryInterface: QueryInterface, sequelize: Sequelize) {
  await queryInterface.bulkDelete('People', null, {})
}
