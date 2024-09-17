import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/entities/products.entity';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Debe contener el id del usuario en formato uuid',
    example: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
  })
  user_id: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ApiProperty({
    description:
      'El arreglo products debe contener al menos un objeto con la llave "id" la cual lleva el id de un producto existente en formato uuid, si hay más de un producto sus ids no pueden ser iguales',
    example: [
      { id: '5f92a8c6-d877-4c89-905b-76f28b171c20' },
      { id: 'a0f85fd3-f61b-48ae-a75a-1f0550e58a30' },
    ],
  })
  products: Partial<Product[]>;
}
