import { IsNotEmptyObject, IsNumber, MaxLength, ArrayMaxSize, ArrayMinSize, arrayMaxSize } from 'class-validator';

export class PollVoteDto {
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  '7points': number[];

  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  '6points': number[];

  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  '5points': number[];

  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  '4points': number[];

  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  '3points': number[];

  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  '2points': number[];

  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(6)
  '1point': number[];
}
