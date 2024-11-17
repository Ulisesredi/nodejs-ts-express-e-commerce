import { BaseRouter } from "../shared/router/router";
import { UserController } from "./controlers/user.controler";

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes() {
    this.router.get("/user", (req, res) => this.controller.getUser(req, res));
  }
}
