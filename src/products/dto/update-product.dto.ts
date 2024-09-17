import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { Category } from 'src/entities/categories.entity';
import { OrderDetails } from 'src/entities/orders-details.entity';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  @ApiProperty({
    description: 'Debe contener al menos 3 caracteres',
    example: 'Iphone 13 Pro Max',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 50)
  @ApiProperty({
    description: 'Debe contener al menos 10 caracteres',
    example: 'iPhone 13 Pro Max: Potencia y elegancia combinadas',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Debe contener exclusivamente valores numéricos',
    example: '679990',
  })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Debe contener exclusivamente valores numéricos',
    example: '1',
  })
  stock: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Debe contener un enlace válido de imagen',
    example: 'https://placehold.co/600x400',
  })
  imgUrl: string;

  category: Category;

  orderDetails: OrderDetails[];
}
