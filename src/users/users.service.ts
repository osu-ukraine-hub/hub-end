import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UserEntity } from 'src/entities';
import BasicRepositoryService from 'src/types/basicRepositoryService';
import { Repository } from 'typeorm';
import { v2 } from 'osu-api-extended';
import BanchoUserResponse from 'src/types/banchoUserResponse';

@Injectable()
export class UsersService extends BasicRepositoryService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findById(
    user_id: number,
    relations: string[] = [],
  ): Promise<UserEntity> | null {
    return await this.userRepository.findOne({
      where: { id: user_id },
      relations: relations,
    });
  }

  async findByOsuId(
    osuId: number,
    relations: string[] = [],
  ): Promise<UserEntity> | null {
    return await this.userRepository.findOne({
      where: { osuId: osuId },
      relations: relations,
    });
  }

  async findOrCreate(userClause: {
    username: string;
    id: number;
  }): Promise<UserEntity> {
    let user = await this.userRepository.findOneBy([
      { id: userClause.id },
      { osuId: userClause.id },
    ]);

    if (!user) {
      const userBancho = await v2.user.details(userClause.id, 'osu');

      user = await this.createUser({
        username: userClause.username,
        osuId: userClause.id,
        country: userBancho.country_code,
      });
    }

    return user;
  }

  async findBanchoUser(query: string): Promise<BanchoUserResponse[]> {
    const response = await v2.site.search({
      mode: 'user',
      query: query,
    });
    const filteredResponse = response.user.data.filter(
      (user) => user.country_code == 'UA',
    );

    return filteredResponse.map((user) => {
      return {
        id: user.id,
        username: user.username,
        avatar_url: user.avatar_url,
      };
    });
  }
}
