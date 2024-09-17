import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController implements OnModuleInit {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  GetProducts(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.productsService.getProductsService(Number(page), Number(limit));
  }

  @Get('price')
  getProductsByPrice(@Query('orderBy') orderBy: 'ASC' | 'DESC') {
    console.log(orderBy);
    return this.productsService.getProductsByPrice(orderBy);
  }

  @Get('seeder')
  addProduct() {
    return this.productsService.addProducts();
  }
  @Get(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  async onModuleInit() {
    await this.productsService.addProducts();
  }
}
