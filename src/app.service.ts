import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { auth } from 'osu-api-extended';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly config: ConfigService) {}

  async onApplicationBootstrap(): Promise<void> {
    await auth.login(
      this.config.get('OSU_API_ID'),
      this.config.get('OSU_API_SECRET'),
    );
  }
}
