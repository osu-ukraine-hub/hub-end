import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { CreateNewsDto } from 'src/dto/createNews.dto';
import { NewsEntity } from 'src/entities/news.entity';
import { Permissions } from 'src/permissions/permissions.decorator';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('/:id')
  async getSingleNews(@Param('id') id: number) {
    const news = await this.newsService.getNewsById(id);

    return news;
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @Permissions('admin')
  async createNews(@Body() createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    const news = this.newsService.createNews(createNewsDto);

    return news;
  }
}
