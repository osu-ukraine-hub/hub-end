import { Module } from '@nestjs/common';
import { createClient } from '@redis/client';

@Module({
  providers: [
    {
      provide: 'REDIS_OPTIONS',
      useValue: {
        url: 'redis://default:redispw@localhost:49153',
      },
    },
    {
      inject: ['REDIS_OPTIONS'],
      provide: 'REDIS_CLIENT',
      useFactory: async (options: { url: string }) => {
        const client = createClient(options);
        await client.connect();
        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
