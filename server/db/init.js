import pg from "pg";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_POSTGRES_LINK, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {},
  dialectModule: pg,
});

sequelize.sync({ alter: true });

export default sequelize;
