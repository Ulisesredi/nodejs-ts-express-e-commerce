import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductDTO } from "../../product/dto/product.dto";
import { ProductEntity } from "../../product/entities/product.entity";
import { PurchaseEntity } from "../entities/purchase.entity";
import { PurchaseDTO } from "../dto/purchase.dto";

export class PurchaseService extends BaseService<PurchaseEntity> {
  constructor() {
    super(PurchaseEntity);
  }

  async getPurchases(): Promise<PurchaseEntity[]> {
    return (await this.execRepository).find();
  }

  async getPurchaseById(id: string): Promise<PurchaseEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }
  async createPurchase(dataset: PurchaseDTO): Promise<PurchaseEntity> {
    return (await this.execRepository).save(dataset);
  }
  async deletePurchase(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
  async updatePurchase(id: string, dataset: ProductDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, dataset);
  }
}
