import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { CreateNewsDto } from 'src/dto/createNews.dto';
import { UserEntity } from 'src/entities';
import { NewsEntity } from 'src/entities/news.entity';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { User } from 'src/users/users.decorator';
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('admin')
  async createNews(@User() user: UserEntity, @Body() createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    const news = this.newsService.createNews(createNewsDto);

    console.log(user);

    return news;
  }
}
