import { Type } from 'class-transformer';
import {
  IsNumber,
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class PollVoteUser {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(24)
  username: string;
}

export class PollVoteDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @Type(() => PollVoteUser)
  points7: PollVoteUser[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @Type(() => PollVoteUser)
  points6: PollVoteUser[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => PollVoteUser)
  points5: PollVoteUser[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => PollVoteUser)
  points4: PollVoteUser[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @Type(() => PollVoteUser)
  points3: PollVoteUser[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => PollVoteUser)
  points2: PollVoteUser[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(6)
  @ValidateNested({ each: true })
  @Type(() => PollVoteUser)
  points1: PollVoteUser[];
}
