import Token from "~/server/db/models/token";

export default defineEventHandler(async event => {
  const refreshToken = getCookie(event, "refresh_token");

  try {
    if (refreshToken) {
      await Token.destroy({
        where: {
          refresh_token: refreshToken,
        },
      });
    }
  } catch {}

  deleteCookie(event, "refresh_token");

  return {
    message: "success",
  };
});
