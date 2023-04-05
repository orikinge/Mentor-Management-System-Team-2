import { Sequelize } from 'sequelize-typescript'
import * as path from "path";
import * as fs from "fs";
import {getAllModelsInDir} from "../utils";

export const connect = () => {

    const hostName = process.env.DATABASE_HOST;
    const userName = process.env.DATABASE_USER;
    const password = process.env.DATABASE_PASSWORD;
    const database = process.env.DATABASE_DB;
    const dialect: any = process.env.DATABASE_DIALECT;

    console.log('dialect  ', dialect)

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
            idle: 5000
        }
    });


    const {modelsArray} = getAllModelsInDir(path.join(__dirname, '../model'));
    sequelize.addModels(modelsArray);

    const db: any = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    
    return db;

}
