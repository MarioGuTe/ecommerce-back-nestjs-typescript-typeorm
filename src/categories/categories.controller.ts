import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from 'src/entities/categories.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController implements OnModuleInit {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getcategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Get('seeder')
  addCategories(): Promise<void> {
    return this.categoriesService.addCategories();
  }
  async onModuleInit() {
    // Call the endpoint when the module initializes
    await this.categoriesService.addCategories();
  }
}
