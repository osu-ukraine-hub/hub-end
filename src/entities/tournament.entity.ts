import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MappoolMapEntity } from './mappoolMap.entity';
import { UserEntity } from './user.entity';

@Entity("tournaments")
export class TournamentEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @OneToMany(() => MappoolMapEntity, (mappool) => mappool.tournament, {
    eager: true, cascade: true
  })
  mappool: MappoolMapEntity[];

  @ManyToOne(() => UserEntity, (user) => user.tournaments, { eager: true })
  @JoinColumn({name: 'creatorId', referencedColumnName: 'id'})
  creator: UserEntity;
}
