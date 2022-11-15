import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, isArray, IsNotEmpty, isNotEmptyObject, ValidateNested } from "class-validator";
import { MappoolMapEntity } from "src/entities/mappoolMap.entity";

export class CreateTournamentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(18)
  @Type(() => MappoolMapEntity)
  mappool: MappoolMapEntity[]
}