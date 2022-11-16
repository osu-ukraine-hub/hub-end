import { Exclude } from 'class-transformer';
import { mappoolPicks } from 'src/enums/mappoolPicks.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TournamentEntity } from './tournament.entity';
import { UserEntity } from './user.entity';

@Entity("mappool_maps")
export class MappoolMapEntity {
  @Exclude()
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4'})
  id: number;

  @Column({
    type: 'enum',
    name: 'pick',
    enum: mappoolPicks,
    nullable: false,
  })
  pick: mappoolPicks;

  @ManyToOne(() => TournamentEntity, (tournament) => tournament.mappool)
  tournament: TournamentEntity;

  @Column({
    nullable: false,
  })
  mapId: number;

  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn({name: 'pickedById', referencedColumnName: 'id'})
  pickedBy: UserEntity;

  @Column({
    nullable: false,
  })
  description: string;
}
