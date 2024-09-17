import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(page?: number, limit?: number) {
    if (page !== undefined && limit !== undefined) {
      const offset = (page - 1) * limit;
      return await this.usersRepository.find({
        relations: { orders: true },
        skip: offset,
        take: limit,
      });
    } else {
      return await this.usersRepository.find({ relations: { orders: true } });
    }
  }

  async getUserById(id: string): Promise<User> {
    const userById = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
    return userById;
  }

  async createUser(newUser: Partial<CreateUserDto>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...user } = newUser;
    return this.usersRepository.save(user);
  }

  async updateUser(id: string, updatedUserData: Partial<CreateUserDto>) {
    const userToUpdate = await this.usersRepository.findOne({ where: { id } });
    if (!userToUpdate) {
      return undefined;
    }

    const mergedUser = { ...userToUpdate, ...updatedUserData };
    await this.usersRepository.save(mergedUser);

    return 'Tu información ha sido actualizada correctamente';
  }

  async deleteUser(id: string) {
    const deleteUser = await this.usersRepository.delete(id);
    if (deleteUser.affected > 0) {
      return `Usuario ${id} eliminado con éxito`;
    }
    return `Usuario ${id} no encontrado`;
  }

  async getUserByEmail(email: string) {
    const userByEmail = await this.usersRepository.findOne({
      where: { email },
      relations: { orders: true },
    });
    return userByEmail;
  }
}
