import { NextFunction, Request, Response } from "express";

import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

import { PurchaseProductDTO } from "../dto/purchase-product.dto";

export class PurchaseProductMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  purchaseProductValidator(req: Request, res: Response, next: NextFunction) {
    const { totalPrice, productQty, purchase, product } = req.body;

    const valid = new PurchaseProductDTO();

    valid.totalPrice = totalPrice;
    valid.productQty = productQty;
    valid.purchase = purchase;
    valid.product = product;
    validate(valid).then((err) => {
      if (!!err.length) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
