import * as path from "path";
import * as fs from "fs";

export const getAllModelsInDir = async (dir: string) => {
  const basename = path.basename(__filename);

  const files = fs.readdirSync(dir).filter((file: string) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  });

  return imports(dir, files);
};

const imports = async (dir: string, files: string[]) => {
  const models: any = {};
  const modelsArray: any = [];
  await Promise.all(
    files.map(async (file: string) => {
      const model = await import(path.join(dir, file));
      const key = Object.keys(model)[0];
      models[key] = model[key];
      modelsArray.push(model[key]);
    }),
  );

  return { models, modelsArray };
};
