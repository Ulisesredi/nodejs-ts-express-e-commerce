import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseEntity } from "../entities/purchase.entity";
import { PurchaseDTO } from "../dto/purchase.dto";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { CustomerService } from "../../customer/services/customer.service";

export class PurchaseService extends BaseService<PurchaseEntity> {
  constructor(
    private readonly customerService: CustomerService = new CustomerService()
  ) {
    super(PurchaseEntity);
  }

  async getPurchases(): Promise<PurchaseEntity[]> {
    return (await this.execRepository).find();
  }

  async getPurchaseById(id: string): Promise<PurchaseEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async findPurchaseWithRelations(id: string): Promise<PurchaseEntity | null> {
    return (await this.execRepository).findOne({
      where: { id },
      relations: ["customer"],
    });
  }

  async createPurchase(dataset: PurchaseDTO): Promise<PurchaseEntity> {
    const { customerId, ...purchaseData } = dataset;

    const customer = await this.customerService.getCustomerById(customerId);
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
