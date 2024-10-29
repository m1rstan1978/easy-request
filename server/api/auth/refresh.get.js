import { useHasCookieTokens } from "@/server/utils/cookie";
import Token from "~/server/db/models/token";
import { useCreateTokens } from "~/server/utils/jwt";
import { useSequalizeError } from "~/server/utils/sequalizeError";

export default defineEventHandler(async event => {
  const { access_token_query } = getQuery(event);
  const { refreshCookie, accessCookie, user_id, accessDecoded } =
    useHasCookieTokens(event, access_token_query);

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
    useCreateCookie(event, "refresh_token", refreshToken, maxAgeRefreshToken);

    return {
      refreshToken: refreshToken,
      accessToken: accessToken,
    };
  } catch (e) {
    const { message, statusCode } = useSequalizeError(e, e.statusCode);
    return createError({ statusCode, message });
  }
});
