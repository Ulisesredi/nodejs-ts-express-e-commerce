import { UserController } from "../controlers/user.controler";
import { BaseRouter } from "./router";

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes() {
    this.router.get("/user", (req, res) => this.controller.getUser(req, res));
  }
}
