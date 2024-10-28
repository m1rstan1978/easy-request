import { Request, User } from "@/server/db/association/userRequest";
import { Op } from "sequelize";
import { useSequalizeError } from "~/server/utils/sequalizeError";

export default defineEventHandler(async event => {
  const fieldsRequest = await readBody(event);
  try {
    const findRequestCheck = await User.findOne({
      include: {
        model: Request,
        where: {
          user_id: fieldsRequest.user_id,
          textarea: fieldsRequest.textarea,
          id: {
            [Op.ne]: fieldsRequest.id,
          },
        },
      },
    });

    if (findRequestCheck) {
      throw createError({
        statusCode: 400,
        message: "Описание должно быть уникальным среди всех записей",
      });
    }

    const request = await Request.findOne({
      attributes: [
        "id",
        "house",
        "flat",
        "deadline",
        "surname",
        "first_name",
        "middle_name",
        "phone",
        "textarea",
      ],
      where: {
        id: fieldsRequest.id,
      },
    });

    const requestVal = request.dataValues;

    let changes = false;

    for (let key in requestVal) {
      const keyNotExist = ["id", "deadline"];
      const getTimeDate = value => new Date(value).getTime();

      const deadlineRequest = getTimeDate(requestVal.deadline);
      const deadlineFields = getTimeDate(fieldsRequest.deadline);

      if (deadlineRequest !== deadlineFields) {
        changes = true;
      }
      if (
        !keyNotExist.includes(key) &&
        requestVal[key] !== fieldsRequest[key]
      ) {
        changes = true;
      }
    }

    if (!changes) {
      return {
        fieldsRequest,
      };
    }

    const updateRequest = await request.update(fieldsRequest);

    return {
      updateRequest,
    };
  } catch (e) {
    const { message, statusCode } = useSequalizeError(e, e.statusCode);
    return createError({ statusCode, message });
  }
});
