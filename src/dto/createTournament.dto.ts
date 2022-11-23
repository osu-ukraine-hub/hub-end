import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import MappoolMapDto from './mappoolMap.dto';

export class CreateTournamentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(18)
  @Type(() => MappoolMapDto)
  mappool: MappoolMapDto[];
}
