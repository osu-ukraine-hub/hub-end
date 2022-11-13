import { Res, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserEntity } from 'src/entities';
import { User } from 'src/users/users.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/osu')
  @UseGuards(AuthGuard('osu'))
  async authorize() {}

  @Get('/osu/callback')
  @UseGuards(AuthGuard('osu'))
  async callback(
    @User() user: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.login(user);

    response.cookie('token', access_token);
    response.redirect('/');
  }
}
