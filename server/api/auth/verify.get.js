export default defineEventHandler(async event => {
  return {
    message: "success",
    refreshToken: getCookie(event, "refresh_token"),
  };
});
