import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('errors')
export class ErrorEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  @JoinColumn({ name: 'errorFor', referencedColumnName: 'id' })
  user: UserEntity;

  @Column('text')
  error: string;

  @Column('text')
  message: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  url: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  lineNo: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  columnNo: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
