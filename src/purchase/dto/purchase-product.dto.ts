import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { PurchaseEntity } from "../entities/purchase.entity";
import { ProductEntity } from "../../product/entities/product.entity";

export class PurchaseProductDTO extends BaseDTO {
  @IsOptional()
  totalPrice?: number;

  @IsNotEmpty()
  productQty!: number;

  @IsNotEmpty()
  purchaseId!: string;

  @IsNotEmpty()
  productId!: string;
}
