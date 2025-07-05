import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JobsService } from '../jobs.service';
import { getLimitAndOffset, paginate } from 'src/common/utils/paginated.utils';
import { JobListingFilterDto } from '../dto/job-listings.dto';

@Controller('public/job-listings')
@ApiTags('public job listings')
export class PublicJobListingController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOperation({ summary: 'Returns active public job listings' })
  async getPublicJobListing(@Query() query: JobListingFilterDto) {
    const [limit, offset] = getLimitAndOffset(query);
    const { items, totalItems } = await this.jobsService.findAllJobListings({
      limit,
      offset,
      ...query,
    });
    return paginate({ items, totalItems, ...query });
  }
}
