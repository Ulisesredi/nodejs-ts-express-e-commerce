import { NextFunction, Request, Response } from "express";

import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

import { CustomerDTO } from "../dto/customer.dto";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

export class CustomerMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }

  customerValidator(req: Request, res: Response, next: NextFunction) {
    const { address, dni, userId } = req.body;

    const valid = new CustomerDTO();

    valid.address = address;
    valid.dni = dni;
    valid.userId = userId;

    validate(valid).then((err) => {
      if (!!err.length) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
