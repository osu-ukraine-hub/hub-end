import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UserEntity } from 'src/entities';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authorize(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { osuId } = createUserDto;
    const user = await this.usersService.findByOsuId(osuId);

    if (!user) return await this.usersService.createUser(createUserDto);

    return user;
  }

  async login(user: UserEntity) {
    const payload = {
      id: user.id,
      username: user.username,
      osuId: user.osuId,
      permissions: user.permissions,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
