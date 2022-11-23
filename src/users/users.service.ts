import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UserEntity } from 'src/entities';
import BasicRepositoryService from 'src/types/basicRepositoryService';
import { Repository } from 'typeorm';

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
}
