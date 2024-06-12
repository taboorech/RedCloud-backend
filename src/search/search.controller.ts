import { AuthGuard } from '@nestjs/passport';
import { SearchService } from './search.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SearchRequestDto } from './dto/search-request.dto';

@Controller('search')
export class SearchController {
  constructor(
    private searchService: SearchService
  ) {}

  @Post('/')
  @UseGuards(AuthGuard("jwt"))
  search(@Req() req: any, @Body() searchRequestDto: SearchRequestDto) {
    return this.searchService.search(req.user, searchRequestDto);
  }
}
