import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Category } from 'src/entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  getCategories(): Promise<Category[]> {
    return this.categoriesRepository.getCategories();
  }

  addCategories(): Promise<void> {
    return this.categoriesRepository.addCategories();
  }
}
