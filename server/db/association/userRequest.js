import Request from "../models/request";
import User from "../models/users";

User.hasMany(Request, { foreignKey: "user_id" });
Request.belongsTo(User, { foreignKey: "user_id" });

export { Request, User };
