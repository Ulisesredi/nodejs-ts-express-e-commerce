import { NextFunction, Request, Response } from "express";

import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

import { PurchaseDTO } from "../dto/purchase.dto";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

export class PurchaseMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }

  purchaseValidator(req: Request, res: Response, next: NextFunction) {
    const { status, paymentMethod, customerId } = req.body;

    const valid = new PurchaseDTO();

    valid.status = status;
    valid.paymentMethod = paymentMethod;
    valid.customerId = customerId;

    validate(valid).then((err) => {
      if (!!err.length) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
