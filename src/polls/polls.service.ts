import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { chunk } from 'lodash';
import { CreatePollDto } from 'src/dto/createPoll.dto';
import { PollVoteDto, PollVoteUser } from 'src/dto/pollVote.dto';
import { Poll, UserEntity } from 'src/entities';
import BasicRepositoryService from 'src/types/basicRepositoryService';
import Leaderboard from 'src/types/parsedLeaderboard';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class PollsService extends BasicRepositoryService {
  constructor(
    @InjectRepository(Poll)
    private pollRepository: Repository<Poll>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRedis() private readonly redis: Redis,
    private readonly usersService: UsersService,
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
      let electeds: PollVoteUser[] = pollVoteDto[key];

      for (let elected of electeds) {
        elected = await this.usersService.findOrCreate({
          id: elected.id,
          username: elected.username,
        });

        await this.addScore(pollId, elected.id, parseInt(key.at(6)));
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

    return await this.parseLeaderboard(leaderboard);
  }

  async addScore(
    pollId: number,
    userId: number,
    points: number,
  ): Promise<void> {
    await this.redis.zadd(`poll:${pollId}`, points, userId);
  }

  async parseLeaderboard(rawRanks: string[]): Promise<Leaderboard[]> {
    return await Promise.all(
      chunk(rawRanks, 2).map(async (item, index) => {
        const user = await this.usersService.findById(parseInt(item[0]));

        return {
          rank: index + 1,
          score: parseInt(item[1]),
          user: user,
        };
      }),
    );
  }
}
