import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { chunk } from 'lodash';
import { CreatePollDto } from 'src/dto/createPoll.dto';
import { PollVoteDto } from 'src/dto/pollVote.dto';
import { Poll, UserEntity } from 'src/entities';
import BasicRepositoryService from 'src/types/basicRepositoryService';
import Leaderboard from 'src/types/parsedLeaderboard';
import { Repository } from 'typeorm';

@Injectable()
export class PollsService extends BasicRepositoryService {
  constructor(
    @InjectRepository(Poll)
    private pollRepository: Repository<Poll>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRedis() private readonly redis: Redis,
  ) {
    super(pollRepository);
  }

  async createPoll(createPollDto: CreatePollDto): Promise<Poll> {
    const poll = await this.pollRepository.save(createPollDto);

    return poll;
  }

  async getPolls(): Promise<Poll[]> {
    const polls = await this.pollRepository.find();

    return polls;
  }

  async getPollById(id: number): Promise<Poll> {
    const poll = await this.pollRepository.findOneBy({ id: id });

    return poll;
  }

  async votePoll(
    pollId: number,
    user: UserEntity,
    pollVoteDto: PollVoteDto,
  ): Promise<void> {
    const poll = await this.pollRepository.findOneBy({ id: pollId });

    if (poll.participants.find((participant) => participant.id == user.id))
      throw new BadRequestException('This user have already voted!');

    user.polls.push(poll);
    await this.userRepository.save(user);

    for (let key in pollVoteDto) {
      let users: number[] = pollVoteDto[key];

      for (let user of users) {
        await this.addScore(pollId, user, parseInt(key.at(0)));
      }
    }
  }

  async getLeaderboard(pollId: number): Promise<Leaderboard[]> {
    const leaderboard = await this.redis.zrevrange(
      `poll:${pollId}`,
      0,
      24,
      'WITHSCORES',
    );

    return this.parseLeaderboard(leaderboard);
  }

  async addScore(
    pollId: number,
    userId: number,
    points: number,
  ): Promise<void> {
    await this.redis.zadd(`poll:${pollId}`, points, userId);
  }

  parseLeaderboard(rawRanks: string[]): Leaderboard[] {
    return chunk(rawRanks, 2).map((item, index) => {
      return {
        rank: index + 1,
        userId: parseInt(item[0]),
        score: parseInt(item[1]),
      };
    });
  }
}
