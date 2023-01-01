import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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
  @IsNumber()
  lineNo?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  columnNo?: number;
}