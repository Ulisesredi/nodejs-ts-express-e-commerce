import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { HttpResponse } from "../../shared/response/http.response";

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getCategories(req: Request, res: Response) {
    try {
      const data = await this.categoryService.getCategories();
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
  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.getCategoryById(id);
      if (!data) {
        this.httpResponse.NotFound(
          res,
          `Couldn't find category with id: ${id}`
        );
        return;
      }
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async createCategory(req: Request, res: Response) {
    try {
      const data = await this.categoryService.createCategory(req.body);
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.updateCategory(id, req.body);
      if (!data.affected) {
        this.httpResponse.NotFound(
          res,
          `Couldn't find category with id: ${id}`
        );
        return;
      }

      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.deleteCategory(id);
      if (!data.affected) {
        this.httpResponse.NotFound(
          res,
          `Couldn't find category with id: ${id}`
        );
        return;
      }

      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.log("ERROR: " + error);
      this.httpResponse.Error(res, error);
    }
  }
}
