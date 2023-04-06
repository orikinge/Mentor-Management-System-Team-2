import * as path from "path";
import * as fs from "fs";

export const getAllModelsInDir = (dir: string) => {
  const basename = path.basename(__filename);
  const models: any = {};
  const modelsArray: any = [];

  fs.readdirSync(dir)
    .filter((file: string) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
      );
    })
    .forEach(async (file: string) => {
      const model = await import(path.join(dir, file));
      const key = Object.keys(model)[0];
      models[key] = model[key];
      modelsArray.push(model[key]);
    });
  return { models, modelsArray };
};
