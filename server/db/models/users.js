import sequelize from "@/server/db/init";
import { useHashPass } from "@/server/utils/hashPassword";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  username: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true,
    validate: {
      matches: {
        args: /^[A-Za-z0-9]+$/,
        msg: "Некорректное имя пользователя",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)) {
        const errorText = `Пароль должен содержать как минимум 6 символов, включать хотя бы одну букву и одну цифру`;
        throw new Error(errorText);
      }
      this.setDataValue("password", useHashPass(value));
    },
  },
});

export default User;
