import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ManageUsersController } from './controllers/manage-users.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [UsersService],
  controllers: [ManageUsersController],
  imports: [DatabaseModule],
  exports: [UsersService],
})
export class UsersModule {}
