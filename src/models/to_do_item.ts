import { Model, Optional } from 'sequelize';
import { sequelize } from "../db";

type ToDoItemAttributes = {
    id: number,
    name: string,
    description: string,
};
  
type ToDoItemCreationAttributes = Optional<ToDoItemAttributes, 'id'>

export class ToDoItem extends Model<ToDoItemAttributes, ToDoItemCreationAttributes> {
    declare id: number
    declare name: string
    declare description: string
}  