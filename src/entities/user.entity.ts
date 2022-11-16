import { Exclude } from 'class-transformer';
import { Permissions } from 'src/enums/permissions.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TournamentEntity } from './tournament.entity';

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
  })
  osuId: number;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Exclude()
  @Column({
    name: 'email_address',
    nullable: true,
    default: '',
  })
  email: string;

  @Column({
    type: 'enum',
    name: 'permissions',
    enum: Permissions,
    default: Permissions.User,
  })
  permissions: Permissions;

  @OneToMany(() => TournamentEntity, (tournament) => tournament.creator, { cascade: true })
  tournaments: TournamentEntity[];
}
