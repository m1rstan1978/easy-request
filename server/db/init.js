import { Sequelize } from "sequelize";

const database = process.env.DB_POSTGRESSQL_DATABASE;
const username = process.env.DB_POSTGRESSQL_USERNAME;
const password = process.env.DB_POSTGRESSQL_PASSWORD;
const host = process.env.DB_POSTGRESSQL_HOST;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "postgres",
});

// sequelize.sync({ force: true });

export default sequelize;
