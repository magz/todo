import { CreationOptional, Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize,  } from "../db";

export class ToDoItem extends Model<InferAttributes<ToDoItem>, InferCreationAttributes<ToDoItem>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

ToDoItem.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      description: {
        type: new DataTypes.STRING(128),
        allowNull: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'to_do_items',
      sequelize
    }
  )

