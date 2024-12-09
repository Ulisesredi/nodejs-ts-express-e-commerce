import { Request, Response } from "express";
import { PurchaseProductService } from "../services/purchase-product.service";
import { HttpResponse } from "../../shared/response/http.response";

export class PurchaseProductController {
  constructor(
    private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getPurchaseProducts(req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.getPurchaseProducts();
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
  async getPurchaseProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseProductService.getPurchaseProductById(id);
      if (!data) {
        this.httpResponse.NotFound(
          res,
          `Couldn't find purchase-product with id: ${id}`
        );
        return;
      }
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async createPurchaseProduct(req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.createPurchaseProduct(
        req.body
      );
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async updatePurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseProductService.updatePurchaseProduct(
        id,
        req.body
      );
      if (!data.affected) {
        this.httpResponse.NotFound(
          res,
          `Couldn't find purchase-product with id: ${id}`
        );
        return;
      }

      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async deletePurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseProductService.deletePurchaseProduct(id);
      if (!data.affected) {
        this.httpResponse.NotFound(
          res,
          `Couldn't find purchase-product with id: ${id}`
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
