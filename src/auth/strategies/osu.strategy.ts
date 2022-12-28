import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as Strategy from 'passport-osu';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UserEntity } from 'src/entities';
import { AuthService } from '../auth.service';

@Injectable()
export default class OsuStrategy extends PassportStrategy(Strategy.default) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      type: 'StrategyOptions',
      clientID: +(<Number>configService.get('OSU_CLIENT_ID')),
      clientSecret: configService.get('OSU_CLIENT_SECRET'),
      callbackURL: configService.get('OSU_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Strategy.PassportProfile,
  ): Promise<UserEntity> {
    const createUserDto: CreateUserDto = {
      username: profile.displayName,
      osuId: profile.id,
      country: profile._json['country_code'],
    };

    return this.authService.authorize(createUserDto);
  }
}
