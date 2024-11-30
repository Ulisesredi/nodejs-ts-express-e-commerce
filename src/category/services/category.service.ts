import { DeleteResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CategoryDTO } from "../dto/category.dto";
import { CategoryEntity } from "../entities/category.entity";

export class CategoryService extends BaseService<CategoryEntity> {
  constructor() {
    super(CategoryEntity);
  }

  async getCategories(): Promise<CategoryEntity[]> {
    return (await this.execRepository).find();
  }

  async getCategoryById(id: string): Promise<CategoryEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async createCategory(dataset: CategoryDTO): Promise<CategoryEntity> {
    return (await this.execRepository).save(dataset);
  }

  async deleteCategory(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }

  async updateCategory(id: string, dataset: CategoryDTO) {
    return (await this.execRepository).update(id, dataset);
  }
}
