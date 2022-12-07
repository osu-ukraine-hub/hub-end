import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SearchBanchoUser {
  @IsNotEmpty()
  @IsString()
  @MaxLength(24)
  query: string;
}