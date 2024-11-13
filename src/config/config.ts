import * as dotenv from "dotenv";
import { ConnectionOptions, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

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

  public get typeORMConfig(): DataSourceOptions {
    return {
      type: "mysql",
      host: this.getEnvironment("DB_HOST"),
      port: this.getNumberEnvironment("DB_PORT"),
      username: this.getEnvironment("DB_USER"),
      password: this.getEnvironment("DB_PASSWORD"),
      database: this.getEnvironment("DB_DATABASE"),
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
