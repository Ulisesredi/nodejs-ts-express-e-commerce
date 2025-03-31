import { BaseRouter } from "../shared/router/router";

import { PurchaseController } from "./controllers/purchase.controller";
import { PurchaseMiddleware } from "./middlewares/purchase.middleware";

export class PurchaseRouter extends BaseRouter<
  PurchaseController,
  PurchaseMiddleware
> {
  constructor() {
    super(PurchaseController, PurchaseMiddleware);
  }

  routes(): void {
    this.router.get("/purchases", this.middleware.passAuth("jwt"), (req, res) =>
      this.controller.getPurchases(req, res)
    );
    this.router.get(
      "/purchases/:id",
      this.middleware.passAuth("jwt"),
      (req, res) => this.controller.getPurchaseById(req, res)
    );
    this.router.get(
      "/purchases/rel/:id",
      this.middleware.passAuth("jwt"),
      (req, res) => this.controller.getPurchaseWithRelationById(req, res)
    );
    this.router.post(
      "/purchases",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.purchaseValidator(req, res, next),
      (req, res) => this.controller.createPurchase(req, res)
    );
    this.router.patch(
      "/purchases/:id",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.updatePurchase(req, res)
    );
    this.router.delete(
      "/purchases/:id",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.deletePurchase(req, res)
    );
  }
}
