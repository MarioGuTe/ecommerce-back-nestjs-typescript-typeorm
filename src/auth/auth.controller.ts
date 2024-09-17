import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import { RemovePasswordInterceptor } from 'src/users/interceptors/remove-password-interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;

    return this.authService.signIn(email, password);
  }

  @Post('signup')
  @UseInterceptors(RemovePasswordInterceptor)
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
}
