// import sequelize from "@/server/db/init";
// import { User } from "@/server/db/models/users";

// import {User,Token } from '@/server/db/associations/userTokenAssociations'

import { sendError } from "h3";

export default defineEventHandler(async event => {
  try {
    return sendError(event, {
      statusCode: 401,
      statusMessage: "Пользователь не авторизован",
    });
    // const user = await User.findAll();
    // return user;
  } catch (e) {}
});
