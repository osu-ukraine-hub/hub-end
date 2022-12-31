import { Module } from '@nestjs/common';
import { ErrorsService } from './errors.service';
import { ErorsController } from './errors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Error, UserEntity } from 'src/entities';
import { UsersService } from 'src/users/users.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Error, UserEntity]), AuthModule],
  providers: [ErrorsService, UsersService],
  controllers: [ErorsController],
})
export class ErrorsModule {}
