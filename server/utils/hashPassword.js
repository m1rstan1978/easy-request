import bcrypt from "bcrypt";

export const useHashPass = value => {
  return bcrypt.hashSync(value, 5);
};

export const useDecodePass = value => {
  return bcrypt.hashSync(value, 5);
};
