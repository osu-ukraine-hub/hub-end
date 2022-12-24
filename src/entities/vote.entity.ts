import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
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

  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'votedBy', referencedColumnName: 'id' })
  voted_by: UserEntity;

  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'votedFor', referencedColumnName: 'id' })
  voted_for: UserEntity;

  @OneToOne(() => PollEntity, { eager: true })
  @JoinColumn({ name: 'pollVoted', referencedColumnName: 'id' })
  poll: PollEntity;

  @CreateDateColumn()
  created_at: Date;
}
