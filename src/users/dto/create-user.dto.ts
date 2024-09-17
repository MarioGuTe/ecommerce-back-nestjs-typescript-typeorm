import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/match-password.decorator';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @ApiProperty({
    description: 'El nombre de usuario debe contener al menos 3 caracteres',
    example: 'Sonny Rollins',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'El email debe ser un correo electrónico válido',
    example: 'sonnyrollins@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character from !@#$%^&*',
    },
  )
  @ApiProperty({
    description:
      'El password debe ser de al menos:  8 caracteres, una mayúscula, una minúscula y uno de los siguientes caracteres especiales !@#$%^&*',
    example: 'Password#1',
  })
  password: string;

  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  @ApiProperty({
    description:
      'La confirmación password debe ser exactamente al password previamente ingresado',
    example: 'Password#1',
  })
  confirmPassword: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description:
      'El número de teléfono debe contener exclusivamente valores numéricos',
    example: 56987654321,
  })
  phone: number;

  @IsNotEmpty()
  @Length(5, 20)
  @ApiProperty({
    description: 'El país debe contener al menos 5 caracteres',
    example: 'Chile',
  })
  country: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  @ApiProperty({
    description: 'La Ciudad debe contener al menos 5 caracteres',
    example: 'Santiago',
  })
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @ApiProperty({
    description: 'El país debe contener al menos 3 caracteres',
    example: 'Calle Siempre Viva 123',
  })
  address: string;

  @IsEmpty()
  @ApiProperty({
    description:
      'Los roles se generan de manera automática, no son accesibles por parte del usuario y no deben ser incluidos en el body',
    example: '',
  })
  isAdmin?: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
