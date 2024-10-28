import { User } from "@/server/db/association/userRequest";
import { useDecodePass } from "@/server/utils/hashPassword";
import Token from "~/server/db/models/token";
import { useCreateTokens } from "~/server/utils/jwt";

export default defineEventHandler(async event => {
  const { username, password } = await readBody(event);

  const user = await User.findOne({
    where: {
      username: username,
    },
    attributes: ["id", "password"],
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      message: "Неправильное имя пользователя или пароль",
    });
  }

  const decodePassword = await useDecodePass(password, user?.password);
  if (!decodePassword) {
    throw createError({
      statusCode: 400,
      message: "Неправильное имя пользователя или пароль",
    });
  }

  try {
    const payload = { id: user.id };
    const { refreshToken, accessToken } = useCreateTokens(payload);

    if (!refreshToken || !accessToken) {
      throw createError({
        statusCode: 400,
        message: "Ошибка регистрации пользователя",
      });
    }

    await Token.destroy({ where: { user_id: user.id } });
    await Token.create({ refresh_token: refreshToken, user_id: user.id });

    const maxAgeRefreshToken = 30 * 24 * 60 * 60 * 1000;
    const maxAgeAccessToken = 15 * 60;
    useCreateCookie(event, "refresh_token", refreshToken, maxAgeRefreshToken);
    useCreateCookie(event, "access_token", accessToken, maxAgeAccessToken);

    return {
      refreshToken,
      accessToken,
    };
  } catch {
    return createError({
      statusCode: 500,
      message: "Ошибка сервера",
    });
  }
});
