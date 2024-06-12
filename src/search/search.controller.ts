import { AuthGuard } from '@nestjs/passport';
import { SearchService } from './search.service';
import { BadRequestException, Body, Controller, NotFoundException, Post, Req, UseGuards } from '@nestjs/common';
import { SearchRequestDto } from './dto/search-request.dto';
import { User } from 'src/schemas/user.schema';
import { Playlist } from 'src/schemas/playlist.schema';
import { Song } from 'src/schemas/song.schema';

@Controller('search')
export class SearchController {
  constructor(
    private searchService: SearchService
  ) {}

  @Post('/')
  @UseGuards(AuthGuard("jwt"))
  search(@Req() req: any, @Body() searchRequestDto: SearchRequestDto): Promise<{ users: User[], playlists: Playlist[], songs: Song[] } | BadRequestException | NotFoundException> {
    return this.searchService.search(req.user, searchRequestDto);
  }
}
