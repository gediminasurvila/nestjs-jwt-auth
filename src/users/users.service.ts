import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Smith',
      email: 'example1@gmail.com',
      password: 'password123',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'example2@gmail.com',
      password: 'password',
    },
  ];

  findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user: User) => user.email === email);
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }

  findOne(id: number): Promise<User | undefined> {
    const user = this.users.find((user: User) => user.id === id);
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }
}
