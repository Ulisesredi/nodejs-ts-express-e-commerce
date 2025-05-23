import { NextFunction, Request, Response } from "express";

import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

import { PurchaseProductDTO } from "../dto/purchase-product.dto";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

export class PurchaseProductMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }

  purchaseProductValidator(req: Request, res: Response, next: NextFunction) {
    const { totalPrice, productQty, productId, purchaseId } = req.body;

    const valid = new PurchaseProductDTO();

    valid.totalPrice = totalPrice;
    valid.productQty = productQty;
    valid.purchaseId = purchaseId;
    valid.productId = productId;
    validate(valid).then((err) => {
      if (!!err.length) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
