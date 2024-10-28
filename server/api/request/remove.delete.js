import { Request } from "@/server/db/association/userRequest";
import { useSequalizeError } from "~/server/utils/sequalizeError";

export default defineEventHandler(async event => {
  try {
    const { id } = getQuery(event);
    await Request.destroy({ where: { id: id } });
    return "success";
  } catch (e) {
    const { message, statusCode } = useSequalizeError(e, e.statusCode);
    return createError({ statusCode, message });
  }
});
