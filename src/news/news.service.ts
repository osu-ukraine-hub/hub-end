import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNewsDto } from 'src/dto/createNews.dto';
import { NewsEntity } from 'src/entities/news.entity';
import BasicRepositoryService from 'src/types/basicRepositoryService';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService extends BasicRepositoryService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {
    super(newsRepository);
  }

  async createNews(createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    const news = await this.newsRepository.save(createNewsDto);

    return news;
  }

  async getNewsById(id: number): Promise<NewsEntity> {
    const news = await this.newsRepository.findOneBy({ id: id });

    return news;
  }
}
