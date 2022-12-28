import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { auth, v2 } from 'osu-api-extended';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly config: ConfigService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await auth.login(
      this.config.get('OSU_API_ID'),
      this.config.get('OSU_API_SECRET'),
    );

    const reposnse = await this.userRepository.find({
      where: { country: 'XX' },
    });

    for (let user of reposnse) {
      const userBancho = await v2.user.details(user.osuId, 'osu');

      await this.userRepository.update(
        { country: 'XX', osuId: user.osuId },
        { country: userBancho.country_code },
      );
    }
  }
}
