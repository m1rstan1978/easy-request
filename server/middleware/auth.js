import { useTokenDecoded } from "@/server/utils/jwt";
import Token from "../db/models/token";

const errorAuth = createError({
  statusCode: 401,
  message: "Ошибка авторизации",
});

export default defineEventHandler(async event => {
  const endpoints = [
    "/api/auth/verify",
    "/api/request/create",
    "/api/request/data",
    "/api/request/edit",
    "/api/request/remove",
  ];

  const isRouteApiEndpoints = endpoints.some(
    item => item === event.req.url.split("?")[0]
  );

  if (!isRouteApiEndpoints) {
    return;
  }

  const accessToken = event.req.headers?.authorization?.split(" ")[1];
  const env = useRuntimeConfig();

  const refreshCookie = getCookie(event, "refresh_token");
  let findRefreshToken;

  try {
    findRefreshToken = await Token.findOne({
      where: {
        refresh_token: refreshCookie,
      },
      raw: true,
    });
  } catch {
    findRefreshToken = null;
  }

  if (!findRefreshToken) {
    return errorAuth;
  }

  if (!accessToken) {
    return errorAuth;
  }

  const decodedToken = useTokenDecoded(accessToken, env.jwtAccessSecret);

  if (!decodedToken) {
    return errorAuth;
  }
});
