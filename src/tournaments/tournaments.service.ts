import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTournamentDto } from 'src/dto/createTournament.dto';
import { Tournament, UserEntity } from 'src/entities';
import BasicRepositoryService from 'src/types/basicRepositoryService';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentsService extends BasicRepositoryService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {
    super(tournamentRepository);
  }

  async createTournament(
    createTournamentDto: CreateTournamentDto,
    creator: UserEntity,
  ): Promise<Tournament> {
    const { title, description, mappool } = createTournamentDto;

    const tournament = await this.tournamentRepository.save({
      title: title,
      description: description,
      mappool: mappool,
      creator: creator,
    });

    return tournament;
  }

  async getSingleTournamentById(tournamentId: number): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOneBy({
      id: tournamentId,
    });

    return tournament;
  }
}
