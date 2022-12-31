import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class PostErrorDto {    
  @IsNotEmpty()
  @IsString()
  error: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  url?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lineNo?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  columnNo?: string;
}