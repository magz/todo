import { QueryInterface, Sequelize } from 'sequelize/types';

export const up = async function(queryInterface: QueryInterface, sequelize: Sequelize) {
    await queryInterface.renameTable('ToDoItems', "to_do_items", {})
}

export const down = async function(queryInterface: QueryInterface, sequelize: Sequelize) {
    await queryInterface.renameTable('to_do_items', "ToDoItems", {})
}
