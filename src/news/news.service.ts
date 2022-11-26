import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getPinnedPost(): Promise<NewsEntity> {
    const post = await this.newsRepository.findOne({ where: { pinned: true } });

    if (!post) throw new NotFoundException(`There are no pinned posts!`);

    return post;
  }

  async getNewsById(id: number): Promise<NewsEntity> {
    const news = await this.newsRepository.findOneBy({ id: id });

    if (!news) throw new NotFoundException(`News with id ${id} not found!`);

    return news;
  }
}
