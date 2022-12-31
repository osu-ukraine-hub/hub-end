import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PostErrorDto from 'src/dto/postError.dto';
import { Error, UserEntity } from 'src/entities';
import BasicRepositoryService from 'src/types/basicRepositoryService';
import { Repository } from 'typeorm';

@Injectable()
export class ErrorsService extends BasicRepositoryService {
  constructor(
    @InjectRepository(Error)
    private readonly errorRepository: Repository<Error>,
  ) {
    super(errorRepository);
  }

  async saveError(user: UserEntity, error: PostErrorDto): Promise<void> {
    await this.errorRepository.save({ user: user, ...error });
  }
}
