import { Module } from '@nestjs/common';
import { PublicJobListingController } from './controllers/public-listings.controller';
import { JobsService } from './jobs.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [PublicJobListingController],
  providers: [JobsService],
  imports: [DatabaseModule],
})
export class JobsModule {}
