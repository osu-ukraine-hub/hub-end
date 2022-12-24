import { MappoolMapEntity } from './mappoolMap.entity';
import { PollEntity } from './poll.entity';
import { TournamentEntity } from './tournament.entity';
import { UserEntity } from './user.entity';
import { VotesEntity } from './vote.entity';

const entities = [UserEntity, TournamentEntity, MappoolMapEntity, PollEntity, VotesEntity];

export { UserEntity, TournamentEntity as Tournament, MappoolMapEntity as Mappool, PollEntity as Poll, VotesEntity as Vote};
export default entities;
