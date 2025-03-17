import { NextFunction, Request, Response } from "express";

import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

import { ProductDTO } from "../dto/product.dto";

export class ProductMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  productValidator(req: Request, res: Response, next: NextFunction) {
    const { name, description, price, categoryId } = req.body;

    const valid = new ProductDTO();

    valid.name = name;
    valid.description = description;
    valid.price = price;
    valid.categoryId = categoryId;
    validate(valid).then((err) => {
      if (!!err.length) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
