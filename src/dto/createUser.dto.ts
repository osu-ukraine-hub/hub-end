import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsNumber()
  osuId: number;
}
