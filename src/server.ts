import express from "express";
import morgan from "morgan";
import cors from "cors";

import { ConfigServer } from "./config/config";

import { UserRouter } from "./user/user.router";
import { CustomerRouter } from "./customer/customer.router";
import { ProductRouter } from "./product/product.router";
import { CategoryRouter } from "./category/category.router";

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
    const customerRouter = new CustomerRouter().router;
    const productRouter = new ProductRouter().router;
    const categoryRouter = new CategoryRouter().router;
    return [userRouter, customerRouter, productRouter, categoryRouter];
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port => ${this.port}`);
    });
  }
}

new Server();
