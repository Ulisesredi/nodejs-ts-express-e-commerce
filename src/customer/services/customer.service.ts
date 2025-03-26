import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CustomerEntity } from "../entities/customer.entity";
import { CustomerDTO } from "../dto/customer.dto";
import { UserService } from "../../user/services/user.service";

export class CustomerService extends BaseService<CustomerEntity> {
  constructor(private readonly userService: UserService = new UserService()) {
    super(CustomerEntity);
  }

  async getCustomers(): Promise<CustomerEntity[]> {
    return (await this.execRepository).find();
  }

  async getCustomerById(id: string): Promise<CustomerEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async findCustomerWithRelations(id: string): Promise<CustomerEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("customer")
      .leftJoinAndSelect("customer.user", "user")
      .where({ id })
      .getOne();
  }

  async createCustomer(dataset: CustomerDTO): Promise<CustomerEntity> {
    const { userId, ...customerData } = dataset;

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const customer = new CustomerEntity();
    Object.assign(customer, customerData);
    customer.user = user;

    return (await this.execRepository).save(customer);
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
