import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseEntity } from "../entities/purchase.entity";
import { PurchaseDTO } from "../dto/purchase.dto";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { AppDataSource } from "../../config/data.source";

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

  async findPurchaseWithRelations(id: string): Promise<PurchaseEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("purchase")
      .leftJoinAndSelect("purchase.customer", "customer")
      .where({ id })
      .getOne();
  }

  async createPurchase(dataset: PurchaseDTO): Promise<PurchaseEntity> {
    const { customerId, ...purchaseData } = dataset;

    const customerRepository = AppDataSource.getRepository(CustomerEntity);

    const customer = await customerRepository.findOneBy({ id: customerId });
    if (!customer) {
      throw new Error(`Customer with id ${customerId} not found`);
    }

    const purchase = new PurchaseEntity();
    Object.assign(purchase, purchaseData);
    purchase.customer = customer;

    return (await this.execRepository).save(purchase);
  }
  async deletePurchase(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
  async updatePurchase(
    id: string,
    dataset: PurchaseDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, dataset);
  }
}
