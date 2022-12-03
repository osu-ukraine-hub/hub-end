import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, MaxLength } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';

export class CreatePollDto {
  @IsNotEmpty()
  @MaxLength(24)
  title: string;

  @IsNotEmpty()
  @MaxLength(6192)
  @Transform((params) => sanitizeHtml(params.value))
  content: string;

  @IsNotEmpty()
  @IsDateString()
  expires_at: Date;
}
