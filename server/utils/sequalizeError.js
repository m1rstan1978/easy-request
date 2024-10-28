import { Sequelize } from "sequelize";

export const useSequalizeError = (error, statusCode) => {
  if (error instanceof Sequelize.ValidationError) {
    const messages = error.errors
      .map((err, idx) => {
        if (idx <= 0) {
          return err.message;
        }
        return null;
      })
      .filter(el => el)
      .join("");
    return {
      message: !messages
        ? "Произошла ошибка. Пожалуйста, попробуйте позже!"
        : messages,
      statusCode: !statusCode ? 400 : statusCode,
    };
  } else {
    return {
      message:
        !error?.message || /[A-Za-z]/.test(error.message)
          ? "Ошибка сервера"
          : error.message,
      statusCode: !statusCode ? 500 : statusCode,
    };
  }
};
