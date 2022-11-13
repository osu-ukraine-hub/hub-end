import { Controller, Get, UseGuards } from '@nestjs/common';
import { PermissionsGuard } from 'src/permissions/permissions.guard';

@Controller('users')
export class UsersController {
  @Get('/')
  async create() {}
}
