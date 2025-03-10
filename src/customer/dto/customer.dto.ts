import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class CustomerDTO extends BaseDTO {
  @IsNotEmpty()
  address!: string;

  @IsNotEmpty()
  dni!: string;

  @IsNotEmpty()
  userId!: string;
}
