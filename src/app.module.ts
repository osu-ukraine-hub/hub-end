import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TournamentsController } from './tournaments/tournaments.controller';
import { TournamentsModule } from './tournaments/tournaments.module';
import { NewsModule } from './news/news.module';
import { PollsModule } from './polls/polls.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get<number>('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
          username: configService.get('REDIS_USER'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    TournamentsModule,
    NewsModule,
    PollsModule,
  ],
  controllers: [UsersController, TournamentsController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
