import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from 'src/entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  getProductsService(page: number, limit: number): Promise<Product[]> {
    return this.productsRepository.getProducts(page, limit);
  }

  getProductById(id: string): Promise<Product | string> {
    return this.productsRepository.getProductById(id);
  }

  addProducts() {
    return this.productsRepository.addProducts();
  }

  updateProduct(id: string, product: Partial<Product>) {
    return this.productsRepository.updateProduct(id, product);
  }

  getProductsByPrice(orderBy: 'ASC' | 'DESC') {
    return this.productsRepository.getProductsByPrice(orderBy);
  }

  // getProductById(id: number): Promise<Product> {
  //   return this.productsRepository.getProductById(id);
  // }

  // createProduct(newProduct: Product) {
  //   return this.productsRepository.createProduct(newProduct);
  // }

  // updateProduct(
  //   id: number,
  //   updatedProduct: Omit<Product, 'id'>,
  // ): Promise<number> {
  //   return this.productsRepository.updateProduct(id, updatedProduct);
  // }

  // deleteProduct(id: number): Promise<string> {
  //   return this.productsRepository.deleteProduct(id);
  // }
}
