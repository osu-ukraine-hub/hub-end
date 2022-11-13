import { Module, UseFilters } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import OsuStrategy from './strategies/osu.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '31d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, OsuStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
