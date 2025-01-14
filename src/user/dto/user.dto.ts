import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class UserDTO extends BaseDTO {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsNotEmpty()
  mobile!: number;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  city!: string;

  @IsNotEmpty()
  province!: string;

  @IsNotEmpty()
  role!: RoleType;
}

export enum RoleType {
  User = "USER",
  Customer = "CUSTOMER",
  Admin = "ADMIN",
}
