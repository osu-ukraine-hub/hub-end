import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { UserEntity } from 'src/entities';
import { User } from './users.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @Expose()
  async me(@User() user: UserEntity): Promise<UserEntity> {
    return await this.usersService.findById(
      user.id,
      this.usersService.getAllRelations(),
    );
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getUserWithId(@Param('id') id: number) {
    return await this.usersService.findById(
      id,
      this.usersService.getAllRelations(),
    );
  }
}
