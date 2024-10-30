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
  house: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      matches: {
        args: /^[А-Яа-я0-9\s.,]+$/,
        msg: "Поле Дом может содержать только буквы, точки и запятые",
      },
    },
  },
  flat: {
    type: DataTypes.STRING(5),
    allowNull: false,
    validate: {
      isNumeric: true,
      len(value) {
        const numStr = value.toString();
        if (numStr.length < 1 || numStr.length > 5) {
          throw new Error("Квартира не выбрана или превышает лимит символов");
        }
      },
    },
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: {
        msg: "Неверный формат даты. Пожалуйста, введите правильную дату.",
      },
      isAfter: {
        args: new Date().toISOString(),
        msg: "Дата не может быть в прошлом.",
      },
    },
  },
  surname: {
    type: DataTypes.STRING(34),
    allowNull: false,
    validate: {
      matches: {
        args: /^[А-Я][а-я]{1,}$/,
        msg: "Некорректно введена фамилия",
      },
    },
  },
  first_name: {
    type: DataTypes.STRING(24),
    allowNull: false,
    validate: {
      matches: {
        args: /^[А-Я][а-я]{1,}$/,
        msg: "Некорректно введено Имя",
      },
    },
  },
  middle_name: {
    type: DataTypes.STRING(24),
    allowNull: false,
    validate: {
      matches: {
        args: /^[А-Я][а-я]{1,}$/,
        msg: "Некорректно введено Отчество",
      },
    },
  },
  phone: {
    type: DataTypes.STRING(18),
    allowNull: false,
    validate: {
      matches: {
        args: /^8 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
        msg: "Номер телефона должен быть в формате: 8 (XXX) XXX-XX-XX",
      },
    },
  },
  textarea: {
    type: DataTypes.STRING(300),
    allowNull: false,
    validate: {
      matches: {
        args: /^(?=.*\S)[a-zA-Zа-яА-Я0-9\s!?.,]{2,300}$/,
        msg: "Описание заявки содержит недопустимые символы или слишком короткое",
      },
    },
    unique: true,
  },
  created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
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
