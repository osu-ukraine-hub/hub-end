import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import PostErrorDto from 'src/dto/postError.dto';
import { UserEntity } from 'src/entities';
import { User } from 'src/users/users.decorator';
import { UsersService } from 'src/users/users.service';
import { ErrorsService } from './errors.service';

@Controller('errors')
export class ErorsController {
  constructor(
    private errorsService: ErrorsService,
    private usersService: UsersService,
  ) {}

  @Post('/postError')
  @UseGuards(JwtAuthGuard)
  async postError(@User() user: UserEntity, @Body() error: PostErrorDto) {
    const userDb = await this.usersService.findById(user.id);

    await this.errorsService.saveError(userDb, error);
  }
}
