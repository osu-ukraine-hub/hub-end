import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { CreateTournamentDto } from 'src/dto/createTournament.dto';
import { Tournament, UserEntity } from 'src/entities';
import { User } from 'src/users/users.decorator';
import { TournamentsService } from './tournaments.service';

@Controller('tournaments')
export class TournamentsController {
  constructor(public service: TournamentsService) {}
  
  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createTournament(
    @User() user: UserEntity,
    @Body() createTournamentDto: CreateTournamentDto,
  ): Promise<Tournament> {
    const tournament = await this.service.createTournament(createTournamentDto, user);

    return tournament;
  }

  @Get('/:id')
  @Expose()
  @UseGuards(JwtAuthGuard)
  async getSingleTournament(
    @Param('id') id: number,
  ): Promise<Tournament> {
    const tournament = await this.service.getSingleTournamentById(id);

    return tournament;
  }
}
