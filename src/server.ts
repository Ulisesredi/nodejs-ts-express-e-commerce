import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import { ConfigServer } from "./config/config";

import { UserRouter } from "./user/user.router";
import { CustomerRouter } from "./customer/customer.router";
import { ProductRouter } from "./product/product.router";
import { CategoryRouter } from "./category/category.router";
import { PurchaseRouter } from "./purchase/purchase.router";
import { PurchaseProductRouter } from "./purchase/purchase-product.router";
import { DataSource } from "typeorm";
import { LoginStrategy } from "./auth/strategies/login.strategy";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";
import { AuthRouter } from "./auth/auth.router";

class Server extends ConfigServer {
  public app: express.Application = express();
  private port = this.getNumberEnvironment("PORT") || 9999;

  constructor() {
    super();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());

    this.passportUse();

    this.dbConnect();

    this.app.use("/api", this.routers());
    this.listen();
  }

  routers(): Array<express.Router> {
    return [
      new UserRouter().router,
      new CustomerRouter().router,
      new ProductRouter().router,
      new CategoryRouter().router,
      new PurchaseRouter().router,
      new PurchaseProductRouter().router,
      new AuthRouter().router,
    ];
  }

  passportUse() {
    return [new LoginStrategy().use, new JwtStrategy().use];
  }

  async dbConnect(): Promise<DataSource | void> {
    return this.initConnection
      .then(() => {
        console.log("Connection succeeded");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port => ${this.port}`);
    });
  }
}

new Server();
