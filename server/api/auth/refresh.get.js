import { useHasCookieTokens } from "@/server/utils/cookie";
import Token from "~/server/db/models/token";
import { useCreateTokens } from "~/server/utils/jwt";

export default defineEventHandler(async event => {
  const { refreshCookie, accessCookie, user_id, accessDecoded } =
    useHasCookieTokens(event);

  if (accessDecoded) {
    return {
      refreshToken: refreshCookie,
      accessToken: accessCookie,
    };
  }
  try {
    const payload = { id: user_id };
    const { refreshToken, accessToken } = useCreateTokens(payload);

    if (!refreshToken || !accessToken) {
      throw createError({
        statusCode: 400,
        message: "Ошибка запроса",
      });
    }

    await Token.destroy({ where: { user_id: user_id } });
    await Token.create({ refresh_token: refreshToken, user_id: user_id });

    const maxAgeRefreshToken = 30 * 24 * 60 * 60 * 1000;
    const maxAgeAccessToken = 15 * 60;

    useCreateCookie(event, "refresh_token", refreshToken, maxAgeRefreshToken);
    useCreateCookie(event, "access_token", accessToken, maxAgeAccessToken);

    return {
      refreshToken: refreshToken,
      accessToken: accessToken,
    };
  } catch {
    return createError({
      statusCode: 500,
      message: "Ошибка сервера",
    });
  }
});
