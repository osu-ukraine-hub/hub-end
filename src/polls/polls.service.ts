import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { chunk } from 'lodash';
import { CreatePollDto } from 'src/dto/createPoll.dto';
import { PollVoteDto, PollVoteUser } from 'src/dto/pollVote.dto';
import { Poll, UserEntity, Vote } from 'src/entities';
import BasicRepositoryService from 'src/types/basicRepositoryService';
import Leaderboard from 'src/types/parsedLeaderboard';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class PollsService extends BasicRepositoryService {
  constructor(
    @InjectRepository(Poll)
    private pollRepository: Repository<Poll>,
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
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

    if (!poll.is_active)
      throw new BadRequestException(
        'This tournament is not active at the time!',
      );

    if (poll.participants.find((participant) => participant.id == user.id))
      throw new BadRequestException('This user have already voted!');

    const pollVotes: { points: number; electeds: UserEntity[] }[] = [];
    for (let key in pollVoteDto) {
      let electeds: PollVoteUser[] = pollVoteDto[key];

      pollVotes.push({
        points: parseInt(key.at(6)),
        electeds: await Promise.all(
          electeds.map(async (elected) => {
            const electedUser = await this.usersService.findOrCreate({
              id: elected.id,
              username: elected.username,
            });

            if (electedUser.id == user.id)
              throw new BadRequestException("You can't vote for yourself!");

            return electedUser;
          }),
        ),
      });
    }

    for (let vote of pollVotes) {
      vote.electeds.forEach(async (elected) => {
        await this.voteRepository.create({
          points: vote.points,
          poll: poll,
          voted_by: user,
          voted_for: elected,
        });

        await this.addScore(pollId, elected.id, vote.points);
      });
    }

    user.polls.push(poll);
    await this.userRepository.save(user);
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
    await this.redis.zincrby(`poll:${pollId}`, points, userId);
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
