import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductDTO } from "../dto/product.dto";
import { ProductEntity } from "../entities/product.entity";
import { CategoryService } from "../../category/services/category.service";

export class ProductService extends BaseService<ProductEntity> {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService()
  ) {
    super(ProductEntity);
  }

  async getProducts(): Promise<ProductEntity[]> {
    return (await this.execRepository).find();
  }

  async getProductById(id: string): Promise<ProductEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async findProductWithRelations(id: string): Promise<ProductEntity | null> {
    return (await this.execRepository).findOne({
      where: { id },
      relations: ["category"],
    });
  }
  async createProduct(dataset: ProductDTO): Promise<ProductEntity> {
    const { categoryId, ...productData } = dataset;

    const category = await this.categoryService.getCategoryById(categoryId);
    if (!category) {
      throw new Error(`Category with id ${categoryId} not found`);
    }

    const product = new ProductEntity();
    Object.assign(product, productData);
    product.category = category;

    return (await this.execRepository).save(product);
  }
  async deleteProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
  async updateProduct(id: string, dataset: ProductDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, dataset);
  }
}
