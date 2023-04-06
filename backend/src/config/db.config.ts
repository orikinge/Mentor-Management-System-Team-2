import { Sequelize } from "sequelize-typescript";
import * as path from "path";
import { getAllModelsInDir } from "../utils";

export const connect = () => {
  const hostName = process.env.DATABASE_HOST as string;
  const userName = process.env.DATABASE_USER as string;
  const password = process.env.DATABASE_PASSWORD as string;
  const database = process.env.DATABASE_DB as string;
  const dialect: any = process.env.DATABASE_DIALECT as string;

  console.log("dialect  ", dialect);

  const operatorsAliases: any = false;

  const sequelize = new Sequelize(database, userName, password, {
    host: hostName,
    dialect,
    operatorsAliases,
    repositoryMode: true,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000,
    },
  });

  const { modelsArray } = getAllModelsInDir(path.join(__dirname, "../model"));
  sequelize.addModels(modelsArray);

  const db: any = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  return db;
};
