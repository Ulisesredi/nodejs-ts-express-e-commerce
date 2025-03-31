import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductDTO } from "../../product/dto/product.dto";
import { PurchaseProductEntity } from "../entities/purchases-products.entity";
import { PurchaseProductDTO } from "../dto/purchase-product.dto";
import { ProductService } from "../../product/services/product.service";

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
  constructor(
    private readonly productService: ProductService = new ProductService()
  ) {
    super(PurchaseProductEntity);
  }

  async getPurchaseProducts(): Promise<PurchaseProductEntity[]> {
    return (await this.execRepository).find();
  }

  async getPurchaseProductById(
    id: string
  ): Promise<PurchaseProductEntity | null> {
    return (await this.execRepository).findOne({
      where: { id },
      relations: ["product"],
    });
  }
  async createPurchaseProduct(
    dataset: PurchaseProductDTO
  ): Promise<PurchaseProductEntity> {
    const { productId, ...purchaseProductData } = dataset;

    const product = await this.productService.getProductById(productId);

    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }

    const purchaseProduct = new PurchaseProductEntity();
    Object.assign(purchaseProduct, purchaseProductData);
    purchaseProduct.product = product;
    purchaseProduct.totalPrice = dataset.productQty * product.price;

    return (await this.execRepository).save(purchaseProduct);
  }

  async deletePurchaseProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
  async updatePurchaseProduct(
    id: string,
    dataset: PurchaseProductDTO
  ): Promise<UpdateResult> {
    const updatedData = { ...dataset };

    if (dataset.productQty) {
      const purchaseProduct = await this.getPurchaseProductById(id);
      if (!purchaseProduct) {
        throw new Error("Purchase Product not found");
      }

      const product = await this.productService.getProductById(
        purchaseProduct.product.id
      );

      if (!product) {
        throw new Error("Product not found");
      }

      updatedData.totalPrice = dataset.productQty * product.price;
    }

    return (await this.execRepository).update(id, updatedData);
  }
}
