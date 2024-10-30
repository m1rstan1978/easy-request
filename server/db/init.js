// import { Sequelize } from "sequelize";

// const database = process.env.DB_POSTGRESSQL_DATABASE;
// const username = process.env.DB_POSTGRESSQL_USERNAME;
// const password = process.env.DB_POSTGRESSQL_PASSWORD;
// const host = process.env.DB_POSTGRESSQL_HOST;

// const sequelize = new Sequelize(database, username, password, {
//   host: host,
//   dialect: "postgres",
// });

// sequelize.sync({ force: true });

// export default sequelize;

import pg from "pg";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_POSTGRES_LINK, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {},
  dialectModule: pg,
});

// sequelize.sync({ force: true });

export default sequelize;
