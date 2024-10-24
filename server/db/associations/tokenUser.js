import Token from "~/server/db/models/token";
import User from "~/server/db/models/users";

User.belongsTo(Token, { as: "Tokens", foreignKey: "token_id" });

export { Token, User };
