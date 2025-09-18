import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JobsService } from '../jobs.service';
import { getLimitAndOffset, paginate } from 'src/common/utils/paginated.utils';
import { PublicJobListingFilterDto } from '../dto/job-listings.dto';
import { ApiErrorCodes } from '@repo/types';

@Controller('public/job-listings')
@ApiTags('public job listings')
export class PublicJobListingController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns active public job listings',
    description:
      'This endpoint retrieves a list of publicly available job listings and supports several optional query parameters to refine results. You can filter by `experienceLevels` (`no-experience`, `fresher`, `intermediate`, `expert`), `types` (`full-time`, `part-time`, `freelance`, `seasonal`, `contract`, `fixed-price`), `workModes` (`remote`, `onsite`, `hybrid`), `categoryIds`, and `dateRanges` (a string value like `3d` for 3 days ago or `5m` for 5 minutes ago) to filter listings based on how recently they were created. These filters can each accept multiple values in a single query, allowing clients to target specific listings by experience requirements, employment structure, work arrangement, category, or recency. Additionally, pagination is supported through the `limit` and `offset` query parameters, where `limit` specifies how many results to return per page (default is 10) and `offset` determines how many results to skip, enabling fine-grained control over the job listings returned by the API.',
  })
  async getPublicJobListing(@Query() query: PublicJobListingFilterDto) {
    const [limit, offset] = getLimitAndOffset(query);
    const { items, totalItems } = await this.jobsService.findAllJobListings({
      limit,
      offset,
      isActive: true,
      ...query,
    });
    return {
      status: true,
      message: 'Public job listings retrieved successfully',
      data: paginate({ items, totalItems, ...query }),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a public job listing with a matching id' })
  async getPublicJobListingById(@Param('id', ParseUUIDPipe) id: string) {
    const foundJob = await this.jobsService.findJobListingById(id);
    if (!foundJob) {
      throw new NotFoundException({
        message: `No job found with a matching id: ${id}`,
        errorCode: ApiErrorCodes.JOB_LISTING_NOT_FOUND,
      });
    }
    return {
      status: true,
      message: 'Job listing retrieved successfully',
      data: foundJob,
    };
  }
}
