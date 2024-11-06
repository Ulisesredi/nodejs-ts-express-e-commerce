import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./router/user.router";

class Server {
  public app: express.Application = express();
  private port = 8000;

  constructor() {
    //Config
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());

    this.app.use("/api", this.routers());

    this.listen();
  }

  routers(): Array<express.Router> {
    const userRouter = new UserRouter().router;
    return [userRouter];
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port => ${this.port}`);
    });
  }
}

new Server();
