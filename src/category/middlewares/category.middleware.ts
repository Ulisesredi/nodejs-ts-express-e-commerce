import { NextFunction, Request, Response } from "express";

import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";
import { CategoryDTO } from "../dto/category.dto";

export class CategoryMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  categoryValidator(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    const valid = new CategoryDTO();

    valid.name = name;

    validate(valid).then((err) => {
      if (!!err.length) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
