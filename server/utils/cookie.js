export const useCreateCookie = (...items) => {
  const [event, name, value, maxAge] = items;
  setCookie(event, name, value, {
    maxAge: maxAge,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};
