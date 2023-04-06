import * as bodyParser from "body-parser";
import * as express from "express";
import "dotenv/config";
import { APILogger } from "./logger/api.logger";
import * as fs from "fs";
import { getAllModelsInDir } from "./utils";
import * as path from "path";

class App {
  public express: express.Application;
  public logger: APILogger;

  /* Swagger files start */
  private swaggerFile: any = process.cwd() + "/swagger/swagger.json";
  private swaggerData: any = fs.readFileSync(this.swaggerFile, "utf8");
  private customCss: any = fs.readFileSync(
    process.cwd() + "/swagger/swagger.css",
    "utf8",
  );
  private swaggerDocument = JSON.parse(this.swaggerData);
  /* Swagger files end */

  constructor() {
    this.express = express.default();
    this.middleware();
    this.routes();
    this.logger = new APILogger();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    // log all requests to the console
    this.express.use((req, res, next) => {
      this.logger.info("Request::" + req.url, req.body);
      next();
    });
  }

  private routes(): void {
    const { modelsArray } = getAllModelsInDir(
      path.join(__dirname, "../routes"),
    );
    modelsArray.forEach((route: any) => {
      this.express.use("/api", route);
    });
    // handle undefined routes
    this.express.use("*", (req, res) => {
      res.send("Make sure url is correct!!!");
    });
  }
}

export default new App().express;
