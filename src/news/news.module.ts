import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { NewsEntity } from 'src/entities/news.entity';
import { UsersService } from 'src/users/users.service';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity, UserEntity])],
  controllers: [NewsController],
  providers: [NewsService, UsersService],
})
export class NewsModule {}
