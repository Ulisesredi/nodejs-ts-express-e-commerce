import * as dotenv from "dotenv";
import {
  Connection,
  ConnectionOptions,
  createConnection,
  DataSource,
  DataSourceOptions,
} from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { AppDataSource } from "./data.source";

export abstract class ConfigServer {
  constructor() {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({ path: nodeNameEnv });
  }

  public getEnvironment(K: string): string | undefined {
    return process.env[K];
  }

  public getNumberEnvironment(K: string): number {
    return Number(process.env[K]);
  }

  public get nodeEnv(): string {
    return this.getEnvironment("NODE_ENV")?.trim() || "";
  }

  public createPathEnv(path: string): string {
    const arrEnv: Array<string> = ["env"];

    if (!!path.length) {
      const stringToArray = path.split(".");
      arrEnv.unshift(...stringToArray);
    }

    return "." + arrEnv.join(".");
  }

  get initConnection(): Promise<DataSource> {
    return AppDataSource.initialize();
  }
}
