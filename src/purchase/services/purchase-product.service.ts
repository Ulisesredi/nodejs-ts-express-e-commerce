import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductDTO } from "../../product/dto/product.dto";
import { PurchaseProductEntity } from "../entities/purchases-products.entity";
import { PurchaseProductDTO } from "../dto/purchase-product.dto";

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
  constructor() {
    super(PurchaseProductEntity);
  }

  async getPurchaseProducts(): Promise<PurchaseProductEntity[]> {
    return (await this.execRepository).find();
  }

  async getPurchaseProductById(
    id: string
  ): Promise<PurchaseProductEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }
  async createPurchaseProduct(
    dataset: PurchaseProductDTO
  ): Promise<PurchaseProductEntity> {
    return (await this.execRepository).save(dataset);
  }

  async deletePurchaseProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
  async updatePurchaseProduct(
    id: string,
    dataset: ProductDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, dataset);
  }
}
