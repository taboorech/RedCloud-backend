import { CreateSongDto } from './dto/create-song.dto';
import { Controller, Put, Req, UseGuards, Body, Get, Param } from '@nestjs/common';
import { SongService } from './song.service';
import { AuthGuard } from '@nestjs/passport';
import { Song } from 'src/schemas/song.schema';

@Controller('song')
export class SongController {
  constructor(
    private songService: SongService
  ) {}

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  getSong(@Param("id") songId: string) {
    return this.songService.getSong(songId);
  }

  @Put("/create")
  @UseGuards(AuthGuard("jwt"))
  createSong(@Req() req: any, @Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songService.createSong(req.user, createSongDto);
  }
}
