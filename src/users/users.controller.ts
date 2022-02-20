import { Controller, Get, Post, Req, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  me(@Req() request: any) {
    const userId = request.user.userId;
    return this.usersService.findOne(userId);
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
