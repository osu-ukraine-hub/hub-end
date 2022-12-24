import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll, UserEntity, Vote } from 'src/entities';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Poll, UserEntity, Vote]), AuthModule],
  providers: [PollsService, UsersService],
  controllers: [PollsController]
})
export class PollsModule {}
