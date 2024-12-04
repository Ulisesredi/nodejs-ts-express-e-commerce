import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { PurchaseEntity } from "../entities/purchase.entity";
import { ProductEntity } from "../../product/entities/product.entity";

export class PurchaseProductDTO extends BaseDTO {
  @IsNotEmpty()
  totalPrice!: number;

  @IsOptional()
  productQty?: number;

  @IsOptional()
  purchase?: PurchaseEntity;

  @IsOptional()
  product?: ProductEntity;
}
