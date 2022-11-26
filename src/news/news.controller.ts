import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { CreateNewsDto } from 'src/dto/createNews.dto';
import { UserEntity } from 'src/entities';
import { NewsEntity } from 'src/entities/news.entity';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('/:id')
  async getSingleNews(@Param('id') id: number): Promise<NewsEntity> {
    const news = await this.newsService.getNewsById(id);

    return news;
  }

  @Get('/pinned')
  async getPinnedPost(): Promise<NewsEntity> {
    const post = await this.newsService.getPinnedPost();

    return post;
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('admin')
  async createNews(@Body() createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    const news = this.newsService.createNews(createNewsDto);

    return news;
  }
}
