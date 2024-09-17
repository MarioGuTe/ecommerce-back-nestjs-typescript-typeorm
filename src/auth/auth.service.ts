import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    const validatedPassword = bcrypt.compare(user.password, password);
    if (!validatedPassword) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = this.jwtService.sign(payload);
    return { token, message: 'User signed in successfully' };
  }

  async signUp(user: Partial<User>) {
    const { email, password } = user;
    const foundUser = await this.usersRepository.getUserByEmail(email);

    if (foundUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }
}
