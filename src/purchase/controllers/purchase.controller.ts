import { Request, Response } from "express";
import { PurchaseService } from "../services/purchase.service";
import { HttpResponse } from "../../shared/response/http.response";

export class PurchaseController {
  constructor(
    private readonly productService: PurchaseService = new PurchaseService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getPurchases(req: Request, res: Response) {
    try {
      const data = await this.productService.getPurchases();
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
  async getPurchaseById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.getPurchaseById(id);
      if (!data) {
        this.httpResponse.NotFound(
          res,
          `Couldn't find purchase with id: ${id}`
        );
        return;
      }
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async createPurchase(req: Request, res: Response) {
    try {
      const data = await this.productService.createPurchase(req.body);
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async updatePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.updatePurchase(id, req.body);
      if (!data.affected) {
        this.httpResponse.NotFound(
          res,
          `Couldn't find purchase with id: ${id}`
        );
        return;
      }

      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async deletePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.deletePurchase(id);
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
