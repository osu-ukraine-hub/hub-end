import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Mappool, Tournament } from 'src/entities';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Mappool]), AuthModule],
  providers: [TournamentsService],
  exports: [TournamentsService],
  controllers: [TournamentsController],
})
export class TournamentsModule {}
