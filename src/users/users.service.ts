import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findById(user_id: number): Promise<UserEntity> | null {
    return await this.userRepository.findOneBy({ id: user_id });
  }

  async findByOsuId(osu_id: number): Promise<UserEntity> | null {
    return await this.userRepository.findOneBy({ osu_id: osu_id });
  }
}
