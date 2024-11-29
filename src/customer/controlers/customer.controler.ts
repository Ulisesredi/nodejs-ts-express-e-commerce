import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";

export class CustomerController {
  constructor(
    private readonly customerService: CustomerService = new CustomerService()
  ) {}

  async getCustomers(req: Request, res: Response) {
    try {
      const data = await this.customerService.getCustomers();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  async getCustomerById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.getCustomerById(id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  async createCustomer(req: Request, res: Response) {
    try {
      const data = this.customerService.createCustomer(req.body);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  async updateCustomer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.updateCustomer(id, req.body);
      res.status(200).json(data);
    } catch (error) {}
  }
  async deleteCustomer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.deleteCustomer(id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
