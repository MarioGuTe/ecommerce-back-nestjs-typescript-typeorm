import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  addOrder(id: string, products) {
    return this.ordersRepository.addOrder(id, products);
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
}
