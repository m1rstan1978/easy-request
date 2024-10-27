import jwt from "jsonwebtoken";

export const useTokenCreate = (payload, secretKey, expires) => {
  try {
    return jwt.sign(payload, secretKey, { expiresIn: expires });
  } catch {
    return null;
  }
};

export const useTokenDecoded = (token, secretKey) => {
  try {
    return jwt.verify(token, secretKey);
  } catch {
    return null;
  }
};

export const useCreateTokens = payload => {
  const env = useRuntimeConfig();
  const refreshToken = useTokenCreate(payload, env.jwtRefreshSecret, "30d");
  const accessToken = useTokenCreate(payload, env.jwtAccessSecret, "15m");

  return {
    refreshToken: refreshToken,
    accessToken: accessToken,
  };
};
