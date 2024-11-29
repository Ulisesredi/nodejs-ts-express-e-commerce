import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CustomerEntity } from "../entities/customer.entity";
import { CustomerDTO } from "../dto/customer.dto";

export class CustomerService extends BaseService<CustomerEntity> {
  constructor() {
    super(CustomerEntity);
  }

  async getCustomers(): Promise<CustomerEntity[]> {
    return (await this.execRepository).find();
  }

  async getCustomerById(id: string): Promise<CustomerEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async createCustomer(dataset: CustomerDTO): Promise<CustomerEntity> {
    return (await this.execRepository).save(dataset);
  }

  async deleteCustomer(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }

  async updateCustomer(
    id: string,
    dataset: CustomerDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, dataset);
  }
}
