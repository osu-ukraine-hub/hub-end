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
    const { osu_id } = createUserDto;
    const user = await this.usersService.findByOsuId(osu_id);

    if (user) {
      return user;
    } else {
      const newUser = await this.usersService.createUser(createUserDto);

      return newUser;
    }
  }

  async login(user: UserEntity) {
    const payload = {
      id: user.id,
      username: user.username,
      osu_id: user.osu_id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
