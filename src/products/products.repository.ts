import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Product } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import * as data from '../data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    let products = await this.productsRepository.find({
      relations: { category: true },
    });

    const start = (page - 1) * limit;
    const end = start + +limit;

    products = products.slice(start, end);
    return products;
  }

  async getProductsByPrice(orderBy: 'ASC' | 'DESC') {
    const productsByPrice = await this.productsRepository.find({
      order: {
        price: orderBy,
      },
    });

    console.log('hola');
    return productsByPrice;
  }

  async getProductById(id: string): Promise<Product | string> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!product) {
      return 'Product not found';
    }

    return product;
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();

    await Promise.all(
      data?.map(async (item) => {
        const category = categories.find(
          (category) => category.name === item.category,
        );

        const product = new Product();
        product.name = item.name;
        product.description = item.description;
        product.price = item.price;
        product.stock = item.stock;
        product.imgUrl = item.imgUrl;
        product.category = category;

        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );

    return 'Products added successfully';
  }

  async updateProduct(id: string, product: Partial<Product>) {
    await this.productsRepository.update(id, product);

    const updatedProduct = await this.productsRepository.findOneBy({ id });
    return updatedProduct;
  }
}

// async deleteProduct(id: number): Promise<string> {
//   const productIndex = this.products.findIndex(
//     (product) => product.id === id,
//   );
//   if (productIndex !== -1) {
//     this.products.splice(productIndex, 1);
//     return `Producto ${id} eliminado con éxito`;
//   }
//   return `Producto ${id} no encontrado`;
// }
// }
