import { DataTypes } from "sequelize";
import sequelize from "../init";

const Token = sequelize.define("Token", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  refresh_token: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: "12",
  },
});

export default Token;
