import { useTokenDecoded } from "@/server/utils/jwt";

export const useCreateCookie = (...items) => {
  const [event, name, value, maxAge] = items;
  setCookie(event, name, value, {
    maxAge: maxAge,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};

export const useHasCookieTokens = (event, access_token_query) => {
  const refreshCookie = getCookie(event, "refresh_token");
  const accessCookie = access_token_query;

  const { jwtAccessSecret, jwtRefreshSecret } = useRuntimeConfig();

  const decodedAccessToken = useTokenDecoded(accessCookie, jwtAccessSecret);
  const decodedRefreshToken = useTokenDecoded(refreshCookie, jwtRefreshSecret);

  if (decodedAccessToken && decodedRefreshToken) {
    return {
      refreshCookie,
      accessCookie,
      user_id: decodedRefreshToken.id,
      accessDecoded: true,
    };
  }

  if (!decodedRefreshToken || !decodedRefreshToken?.id) {
    throw createError({ statusCode: 401, message: "Ошибка авторизации" });
  }

  return {
    refreshCookie,
    user_id: decodedRefreshToken.id,
    accessDecoded: false,
  };
};
