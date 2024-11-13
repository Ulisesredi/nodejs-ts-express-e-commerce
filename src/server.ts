import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./router/user.router";
import { ConfigServer } from "./config/config";
import { Connection, createConnection, DataSource } from "typeorm";

class Server extends ConfigServer {
  public app: express.Application = express();
  private port = this.getNumberEnvironment("PORT") || 9999;

  constructor() {
    super();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.dbConnect();

    this.app.use(morgan("dev"));
    this.app.use(cors());

    this.app.use("/api", this.routers());

    this.listen();
  }

  routers(): Array<express.Router> {
    const userRouter = new UserRouter().router;
    return [userRouter];
  }

  async dbConnect(): Promise<Connection> {
    return await createConnection(this.typeORMConfig);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port => ${this.port}`);
    });
  }
}

new Server();
