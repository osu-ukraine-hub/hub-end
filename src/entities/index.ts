import { MappoolMapEntity } from './mappoolMap.entity';
import { TournamentEntity } from './tournament.entity';
import { UserEntity } from './user.entity';

const entities = [UserEntity, TournamentEntity, MappoolMapEntity];

export { UserEntity, TournamentEntity as Tournament, MappoolMapEntity as Mappool };
export default entities;
