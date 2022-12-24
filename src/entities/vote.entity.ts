import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PollEntity } from './poll.entity';
import { UserEntity } from './user.entity';

@Entity('votes')
export class VotesEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column()
  points: number;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'votedBy', referencedColumnName: 'id' })
  voted_by: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'votedFor', referencedColumnName: 'id' })
  voted_for: UserEntity;

  @ManyToOne(() => PollEntity, { eager: true })
  @JoinColumn({ name: 'pollVoted', referencedColumnName: 'id' })
  poll: PollEntity;

  @CreateDateColumn()
  created_at: Date;
}
