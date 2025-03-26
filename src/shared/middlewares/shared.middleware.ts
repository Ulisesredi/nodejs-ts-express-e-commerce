import passport from "passport";
import { HttpResponse } from "../response/http.response";
import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../../user/entities/user.entity";
import { RoleType } from "../../user/dto/user.dto";

export class SharedMiddleware {
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {}

  passAuth(type: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate(
        type,
        { session: false },
        (
          err: any,
          user: UserEntity,
          info: object | string | Array<string | undefined>
        ) => {
          if (err || !user) {
            return res.status(401).json({ message: "Unauthorized", info });
          }
          req.user = user;
          next();
        }
      )(req, res, next);
    };
  }

  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    if (user.role !== RoleType.Admin) {
      return this.httpResponse.Unauthorized(res, "Unauthorized.");
    }

    return next();
  }
}
