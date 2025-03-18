import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { RoleType, UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import * as bcrypt from "bcrypt";

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
    const newUser = await (await this.execRepository).create(dataset);
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    return (await this.execRepository).save(newUser);
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where({ email })
      .getOne();
  }
  async findUserByUsername(username: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where({ username })
      .getOne();
  }

  async findUserWithRole(
    id: string,
    role: RoleType
  ): Promise<UserEntity | null> {
    const user = (await this.execRepository)
      .createQueryBuilder("user")
      .where({ id })
      .andWhere({ role })
      .getOne();

    return user;
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }

  async updateUser(id: string, dataset: UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, dataset);
  }
}
