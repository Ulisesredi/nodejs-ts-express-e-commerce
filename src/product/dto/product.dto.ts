import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class ProductDTO extends BaseDTO {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  price!: number;

  @IsNotEmpty()
  categoryId!: string;
}
