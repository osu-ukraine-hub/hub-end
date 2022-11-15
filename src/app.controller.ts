import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwtAuth.guard';
import { UserEntity } from './entities';
import { User } from './users/users.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(@User() user: UserEntity): UserEntity {
    return user;
  }
}
