import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  thumbnail: string;

  @Column('text')
  content: string;

  @Column('boolean')
  pinned: boolean;

  @CreateDateColumn()
  created_at: Date;
}
