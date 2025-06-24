import { Controller, Get } from '@nestjs/common';
import { AppService, Languages } from './app.service';
import { ApiResponse } from '@repo/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAvailableLanguages(): ApiResponse<Languages[]> {
    return {
      status: true,
      statusCode: 200,
      message: 'Available languages retrieved successfully',
      data: this.appService.availableLanguages(),
    };
  }
}
