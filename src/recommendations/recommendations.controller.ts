import { RecommendationsService } from './recommendations.service';
import { Controller, Get } from '@nestjs/common';

@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private recommendationsService: RecommendationsService
  ) {}

  @Get('/')
  getRecommendations() {
    return this.recommendationsService.getRecommendations();
  }
}
