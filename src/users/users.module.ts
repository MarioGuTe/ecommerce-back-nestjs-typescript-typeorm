import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
// import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, AuthService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
