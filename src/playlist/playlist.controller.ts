import { Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlaylistCreateDto } from './dto/playlist-create.dto';
import { PlaylistService } from './playlist.service';

@Controller('playlist')
export class PlaylistController {
  constructor(
    private playlistService: PlaylistService
  ) {}

  @Get("/")
  @UseGuards(AuthGuard("jwt"))
  getPlaylists(@Req() req: any) {
    return this.playlistService.getPlaylists(req.user);
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  getPlaylist(@Req() req: any, @Param("id") playlistId: string) {
    return this.playlistService.getPlaylist(req.user, playlistId);
  }

  @Put("/create")
  @UseGuards(AuthGuard("jwt"))
  createPlaylist(@Req() req: any, @Body() playlistCreateDto: PlaylistCreateDto) {
    return this.playlistService.createPlaylist(req.user, playlistCreateDto);
  }
}
