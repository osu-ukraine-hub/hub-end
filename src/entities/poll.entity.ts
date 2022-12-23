import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('polls')
export class PollEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_active: boolean;

  @ManyToMany(() => UserEntity, (user) => user.polls, { eager: true })
  participants: UserEntity[];

  @Column({ type: 'timestamptz' })
  expires_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
