import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { PollsService } from './polls.service';
import { Permissions } from 'src/permissions/permissions.decorator';
import { CreatePollDto } from 'src/dto/createPoll.dto';
import { Poll, UserEntity } from 'src/entities';
import Leaderboard from 'src/types/parsedLeaderboard';
import { PollVoteDto } from 'src/dto/pollVote.dto';
import { User } from 'src/users/users.decorator';
import { UsersService } from 'src/users/users.service';

@Controller('polls')
export class PollsController {
  constructor(
    private pollsService: PollsService,
    private usersService: UsersService,
  ) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @Permissions('admin')
  async createPoll(@Body() createPollDto: CreatePollDto): Promise<Poll> {
    return await this.pollsService.createPoll(createPollDto);
  }

  @Get('/all')
  async getAllPolls(): Promise<Poll[]> {
    return await this.pollsService.getPolls();
  }

  @Get('/:id')
  async getPollById(@Param('id') pollId: number): Promise<Poll> {
    return await this.pollsService.getPollById(pollId);
  }

  @Get('/:id/leaderboard')
  async getPollLeaderboardById(
    @Param('id') pollId: number,
  ): Promise<Leaderboard[]> {
    return await this.pollsService.getLeaderboard(pollId);
  }

  @Post('/:id/vote')
  @UseGuards(JwtAuthGuard)
  @Permissions('user')
  async votePoll(
    @Param('id') pollId: number,
    @User() user: UserEntity,
    @Body() pollVoteDto: PollVoteDto,
  ): Promise<void> {
    const userDb = await this.usersService.findById(
      user.id,
      this.usersService.getAllRelations(),
    );

    await this.pollsService.votePoll(pollId, userDb, pollVoteDto);
  }
}
