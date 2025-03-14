import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

export class UserMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  userValidator(req: Request, res: Response, next: NextFunction) {
    const {
      username,
      password,
      firstName,
      lastName,
      mobile,
      email,
      city,
      province,
      role,
    } = req.body;

    const valid = new UserDTO();

    valid.username = username;
    valid.password = password;
    valid.firstName = firstName;
    valid.lastName = lastName;
    valid.mobile = mobile;
    valid.email = email;
    valid.city = city;
    valid.province = province;
    valid.role = role;

    validate(valid).then((err) => {
      if (!!err.length) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
