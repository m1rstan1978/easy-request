import bcrypt from "bcrypt";

const salt = 5;

export const useHashPass = value => {
  return bcrypt.hashSync(value, salt);
};

export const useDecodePass = async (value, encrypted) => {
  try {
    return await bcrypt.compare(value, encrypted);
  } catch {
    return null;
  }
};
