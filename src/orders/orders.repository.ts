import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orders-details.entity';
import { Order } from 'src/entities/orders.entity';
import { Product } from 'src/entities/products.entity';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private ordersDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async addOrder(id: string, products) {
    let total = 0;
    const userById = await this.usersRepository.findOneBy({ id: id });

    if (!userById) {
      return 'Usuario no encontrado';
    }

    const order = new Order();
    order.date = new Date();
    order.user = userById;

    const newOrder = await this.ordersRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async (item) => {
        const product = await this.productsRepository.findOneBy({
          id: item.id,
        });
        if (!product) {
          return 'Producto no encontrado';
        }

        total += Number(product.price);
        await this.productsRepository.update(
          { id: item.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    const orderDetail = new OrderDetails();

    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;

    await this.ordersDetailsRepository.save(orderDetail);

    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: { orderDetails: true },
    });
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id: id },
      relations: { orderDetails: { products: true } },
    });

    if (!order) {
      return 'Orden no encontrada';
    }
    return order;
  }
}
