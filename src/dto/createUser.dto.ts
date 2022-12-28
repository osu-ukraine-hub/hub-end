import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsNumber()
  osuId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  country: string;
}
