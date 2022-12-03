import { MappoolMapEntity } from './mappoolMap.entity';
import { PollEntity } from './poll.entity';
import { TournamentEntity } from './tournament.entity';
import { UserEntity } from './user.entity';

const entities = [UserEntity, TournamentEntity, MappoolMapEntity, PollEntity];

export { UserEntity, TournamentEntity as Tournament, MappoolMapEntity as Mappool, PollEntity as Poll };
export default entities;
