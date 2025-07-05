import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JobsService } from '../jobs.service';

@Controller('public/job-categories')
@ApiTags('public job categories')
export class PublicJobCategoriesController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOperation({ summary: 'Returns a list of job categories' })
  async getJobCategories() {
    const categories = await this.jobsService.findAllCategories();
    return {
      status: true,
      message: 'Job categories retrieved successfully',
      data: categories,
    };
  }
}
