import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpResponse } from "../../shared/response/http.response";

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getUsers(req: Request, res: Response) {
    try {
      const data = await this.userService.getUsers();
      if (!data) {
        this.httpResponse.Ok(res, []);
        return;
      }
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.getUserById(id);
      if (!data) {
        this.httpResponse.NotFound(res, `Couldn't find user with id: ${id}`);
        return;
      }
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async getUserWithRelationById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUserWithRelations(id);
      if (!data) {
        this.httpResponse.NotFound(res, `Couldn't find user with id: ${id}`);
        return;
      }
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async createUser(req: Request, res: Response) {
    try {
      const data = await this.userService.createUser(req.body);
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.updateUser(id, req.body);

      if (!data.affected) {
        this.httpResponse.NotFound(res, `Couldn't find user with id: ${id}`);
        return;
      }

      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.deleteUser(id);

      if (!data.affected) {
        this.httpResponse.NotFound(res, `Couldn't find user with id: ${id}`);
        return;
      }

      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
}
