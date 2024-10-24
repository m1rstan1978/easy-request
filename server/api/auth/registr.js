import { User } from "~/server/db/associations/tokenUser";

export default defineEventHandler(async event => {
  const { username, password, refresh_token } = await readBody(event);

  const findUser = await User.findOne({
    where: {
      username: username,
    },
    raw: true,
  });

  if (findUser) {
    return createError({
      statusCode: 400,
      message: "Пользователь с таким именем уже существует",
    });
  }

  await User.create({ username, password, refresh_token });
  return await User.findAll();
});
