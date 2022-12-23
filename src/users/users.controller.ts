import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { SearchBanchoUser } from 'src/dto/searchBanchoUser.dto';
import { UserEntity } from 'src/entities';
import { Permissions } from 'src/permissions/permissions.decorator';
import BanchoUserResponse from 'src/types/banchoUserResponse';
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
  @Permissions('admin')
  async getUserWithId(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.findById(
      id,
      this.usersService.getAllRelations(),
    );
  }

  @Post('/search/bancho')
  @UseGuards(JwtAuthGuard)
  @Permissions('user')
  async serchBanchoUser(
    @Body() searchBanchoUser: SearchBanchoUser,
  ): Promise<BanchoUserResponse[]> {
    const response = await this.usersService.findBanchoUser(
      searchBanchoUser.query,
    );

    return response;
  }
}
