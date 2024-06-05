import { CreateSongDto } from './dto/create-song.dto';
import { Controller, Put, Req, UseGuards, Body } from '@nestjs/common';
import { SongService } from './song.service';
import { AuthGuard } from '@nestjs/passport';
import { Song } from 'src/schemas/song.schema';

@Controller('song')
export class SongController {
  constructor(
    private songService: SongService
  ) {}

  @Put("/create")
  @UseGuards(AuthGuard("jwt"))
  createSong(@Req() req: any, @Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songService.createSong(req.user, createSongDto);
  }
}
