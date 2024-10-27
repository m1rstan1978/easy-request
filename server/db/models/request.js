import { DataTypes } from "sequelize";
import sequelize from "../init";
import User from "./users";

const Request = sequelize.define("Request", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  deadline: {
    type: DataTypes.TIME,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      key: "id",
      model: User,
    },
  },
});

export default Request;
