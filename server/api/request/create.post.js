import { Request, User } from "@/server/db/association/userRequest";
import { useSequalizeError } from "~/server/utils/sequalizeError";

export default defineEventHandler(async event => {
  const fieldsRequest = await readBody(event);
  try {
    const findRequest = await User.findOne({
      include: {
        model: Request,
        where: {
          user_id: fieldsRequest.user_id,
          textarea: fieldsRequest.textarea,
        },
      },
    });

    if (findRequest) {
      throw createError({
        statusCode: 400,
        message: "Описание должно быть уникальным среди всех записей",
      });
    }
    const request = await Request.create(fieldsRequest);
    return {
      request,
    };
  } catch (e) {
    const { message, statusCode } = useSequalizeError(e, e.statusCode);
    return createError({ statusCode, message });
  }
});
