import {
  Res,
  Controller,
  Get,
  UseGuards,
  Req,
  BadRequestException,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserEntity } from 'src/entities';
import { User } from 'src/users/users.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('token');

    return {
      status: "Logged out successfully!"
    }
  }

  @Get('/osu')
  @UseGuards(AuthGuard('osu'))
  async authorize() {}

  @Post('/osu/callback')
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
