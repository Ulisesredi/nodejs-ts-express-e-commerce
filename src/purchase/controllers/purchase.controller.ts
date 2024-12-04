import { Request, Response } from "express";
import { PurchaseService } from "../services/purchase.service";

export class PurchaseController {
  constructor(
    private readonly productService: PurchaseService = new PurchaseService()
  ) {}

  async getPurchases(req: Request, res: Response) {
    try {
      const data = await this.productService.getPurchases();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  async getPurchaseById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.getPurchaseById(id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  async createPurchase(req: Request, res: Response) {
    try {
      const data = await this.productService.createPurchase(req.body);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  async updatePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.updatePurchase(id, req.body);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  async deletePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.deletePurchase(id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
