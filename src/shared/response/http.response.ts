import { Response } from "express";

export enum HttpStatusCode {
  OK = 200,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse {
  Ok(res: Response, data?: any): Response {
    return res.status(HttpStatusCode.OK).json({
      status: HttpStatusCode.OK,
      statusMsg: "Success.",
      data: data,
    });
  }

  NotFound(res: Response, data?: any): Response {
    return res.status(HttpStatusCode.NOT_FOUND).json({
      status: HttpStatusCode.NOT_FOUND,
      statusMsg: "Not Found.",
      error: data,
    });
  }

  Unauthorized(res: Response, data?: any): Response {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: HttpStatusCode.UNAUTHORIZED,
      statusMsg: "Unauthorized.",
      error: data,
    });
  }

  Forbidden(res: Response, data?: any): Response {
    return res.status(HttpStatusCode.FORBIDDEN).json({
      status: HttpStatusCode.FORBIDDEN,
      statusMsg: "Forbidden.",
      error: data,
    });
  }

  Error(res: Response, data?: any): Response {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      statusMsg: "Internal server error.",
      error: data,
    });
  }
}
