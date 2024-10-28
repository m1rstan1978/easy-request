import { useTokenDecoded } from "@/server/utils/jwt";

const errorAuth = createError({
  statusCode: 401,
  message: "Ошибка авторизации",
});

export default defineEventHandler(async event => {
  const endpoints = [
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

  if (!accessToken) {
    return errorAuth;
  }

  const decodedToken = useTokenDecoded(accessToken, env.jwtAccessSecret);

  if (!decodedToken) {
    return errorAuth;
  }
});
