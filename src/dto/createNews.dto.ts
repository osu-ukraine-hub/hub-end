import { IsBoolean, IsNotEmpty, IsOptional, IsUrl, MaxLength } from "class-validator";

export class CreateNewsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsUrl(undefined, {
    message: "Thumbnail needs to be an URL.",
  })
  thumbnail: string;

  @IsNotEmpty()
  @MaxLength(2048)
  content: string;

  @IsOptional()
  @IsBoolean()
  pinned: boolean = false;
}