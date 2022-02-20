import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User | undefined> {
    const user = this.usersRepository.findOne({ email });
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }

  findOne(id: number): Promise<User | undefined> {
    const user = this.usersRepository.findOne(id);
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    // 1 check if user exits
    const userFound = await this.findByEmail(createUserDto.email);
    if (userFound) {
      return undefined;
    }

    // 2 hash password
    const plainPassword = createUserDto.password;
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
    };
    // 3 create new user
    const newUser = this.usersRepository.create(userWithHashedPassword);
    // 4. return newly created user
    return this.usersRepository.save(newUser);
  }
}
