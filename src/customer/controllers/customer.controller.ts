import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";
import { HttpResponse } from "../../shared/response/http.response";

export class CustomerController {
  constructor(
    private readonly customerService: CustomerService = new CustomerService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getCustomers(req: Request, res: Response) {
    try {
      const data = await this.customerService.getCustomers();
      if (!data) {
        this.httpResponse.Ok(res, []);
        return;
      }
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async getCustomerById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.getCustomerById(id);
      if (!data) {
        this.httpResponse.NotFound(
          res,
          `Couldn't find customer with id: ${id}`
        );
        return;
      }
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async getCustomerWithRelationById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.findCustomerWithRelations(id);
      if (!data) {
        this.httpResponse.NotFound(
          res,
          `Couldn't find customer with id: ${id}`
        );
        return;
      }
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async createCustomer(req: Request, res: Response) {
    try {
      const data = await this.customerService.createCustomer(req.body);
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async updateCustomer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.updateCustomer(id, req.body);
      if (!data.affected) {
        this.httpResponse.NotFound(
          res,
          `Couldn't find customer with id: ${id}`
        );
        return;
      }

      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async deleteCustomer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.deleteCustomer(id);
      if (!data.affected) {
        this.httpResponse.NotFound(
          res,
          `Couldn't find customer with id: ${id}`
        );
        return;
      }

      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
}
