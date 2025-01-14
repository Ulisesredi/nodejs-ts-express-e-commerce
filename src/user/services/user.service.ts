import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async getUsers(): Promise<UserEntity[]> {
    return (await this.execRepository).find();
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async findUserWithRelations(id: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.customer", "customer")
      .where({ id })
      .getOne();
  }

  async createUser(dataset: UserDTO): Promise<UserEntity> {
    return (await this.execRepository).save(dataset);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }

  async updateUser(id: string, dataset: UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, dataset);
  }
}
