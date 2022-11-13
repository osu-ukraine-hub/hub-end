import { Exclude } from 'class-transformer';
import { Permissions } from 'src/enums/permissions.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    nullable: false,
  })
  osu_id: number;

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
}
