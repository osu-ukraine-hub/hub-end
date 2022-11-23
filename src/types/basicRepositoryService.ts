import { ObjectLiteral, Repository } from 'typeorm';

export default class BasicRepositoryService {
  constructor(private readonly baseRepository: Repository<ObjectLiteral>) {}

  getAllRelations(): string[] {
    return this.baseRepository.metadata.relations.map(
      (relation) => relation.propertyName,
    );
  }
}
