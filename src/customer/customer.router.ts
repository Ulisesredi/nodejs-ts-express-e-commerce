import { BaseRouter } from "../shared/router/router";
import { CustomerController } from "./controllers/customer.controller";
import { CustomerMiddleware } from "./middlewares/customer.middleware";

export class CustomerRouter extends BaseRouter<
  CustomerController,
  CustomerMiddleware
> {
  constructor() {
    super(CustomerController, CustomerMiddleware);
  }

  routes(): void {
    this.router.get("/customers", (req, res) =>
      this.controller.getCustomers(req, res)
    );
    this.router.get("/customers/:id", (req, res) =>
      this.controller.getCustomerById(req, res)
    );
    this.router.get("/customers/rel/:id", (req, res) =>
      this.controller.getCustomerWithRelationById(req, res)
    );
    this.router.post(
      "/customers",
      (req, res, next) => this.middleware.customerValidator(req, res, next),
      (req, res) => this.controller.createCustomer(req, res)
    );
    this.router.patch("/customers/:id", (req, res) =>
      this.controller.updateCustomer(req, res)
    );
    this.router.delete("/customers/:id", (req, res) =>
      this.controller.deleteCustomer(req, res)
    );
  }
}
