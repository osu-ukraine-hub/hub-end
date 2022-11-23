import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { mappoolPicks } from "src/enums/mappoolPicks.enum";

export default class MappoolMapDto {
  @IsNotEmpty()
  @IsEnum(mappoolPicks)
  pick: mappoolPicks;

  @IsNotEmpty()
  mapId: number;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(24)
  description: string;
}