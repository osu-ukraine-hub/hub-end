import {
  Res,
  Controller,
  Get,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
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
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserEntity> {
    if (req.cookies && 'token' in req.cookies && req.cookies.token.length > 0)
      throw new BadRequestException({
        info: 'Already Authorized!',
      });

    const { access_token } = await this.authService.login(user);

    response.cookie('token', access_token);
    return user;
  }
}
