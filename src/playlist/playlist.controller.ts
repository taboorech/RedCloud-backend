import { Body, Controller, Get, NotAcceptableException, Param, Patch, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlaylistCreateDto } from './dto/playlist-create.dto';
import { PlaylistService } from './playlist.service';
import { AddSongDto } from './dto/add-song.dto';
import { Playlist } from 'src/schemas/playlist.schema';
import { AddOwnerDto } from './dto/add-owner.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(
    private playlistService: PlaylistService
  ) {}

  @Get("/")
  @UseGuards(AuthGuard("jwt"))
  getPlaylists(@Req() req: any): Promise<Playlist[]> {
    return this.playlistService.getPlaylists(req.user);
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  getPlaylist(@Req() req: any, @Param("id") playlistId: string): Promise<{playlist: Playlist, isOwner: boolean} | NotAcceptableException>  {
    return this.playlistService.getPlaylist(req.user, playlistId);
  }

  @Patch("/:id/addSong")
  @UseGuards(AuthGuard("jwt"))
  addSong(@Req() req: any, @Param("id") playlistId: string, @Body() addSongDto: AddSongDto): Promise<Playlist | NotAcceptableException> {
    return this.playlistService.addSong(req.user, playlistId, addSongDto);
  }

  @Put("/create")
  @UseGuards(AuthGuard("jwt"))
  createPlaylist(@Req() req: any, @Body() playlistCreateDto: PlaylistCreateDto): Promise<Playlist> {
    return this.playlistService.createPlaylist(req.user, playlistCreateDto);
  }

  @Patch("/:id/addOwner")
  @UseGuards(AuthGuard("jwt"))
  addOwner(@Req() req: any, @Param("id") playlistId: string, @Body() addOwnerDto: AddOwnerDto): Promise<Playlist | NotAcceptableException> {
    return this.playlistService.addOwner(req.user, playlistId, addOwnerDto);
  }
}
