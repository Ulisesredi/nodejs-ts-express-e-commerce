import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { PurchaseProductEntity } from "../entities/purchases-products.entity";

export class PurchaseDTO extends BaseDTO {
  @IsNotEmpty()
  status!: string;

  @IsNotEmpty()
  paymentMethod!: string;

  @IsNotEmpty()
  customer!: CustomerEntity;

  @IsNotEmpty()
  purchaseProduct!: PurchaseProductEntity[];
}
