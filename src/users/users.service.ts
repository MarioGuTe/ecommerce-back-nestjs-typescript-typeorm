import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '../entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  getUsers(page?: number, limit?: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  createUser(newUser: CreateUserDto) {
    return this.usersRepository.createUser(newUser);
  }

  updateUser(id: string, updatedUser: Partial<User>) {
    return this.usersRepository.updateUser(id, updatedUser);
  }
  deleteUser(id: string): Promise<string> {
    return this.usersRepository.deleteUser(id);
  }
}
