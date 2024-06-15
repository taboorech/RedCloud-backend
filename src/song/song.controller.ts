import { CreateSongDto } from './dto/create-song.dto';
import { Controller, Put, Req, UseGuards, Body, Get, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { SongService } from './song.service';
import { AuthGuard } from '@nestjs/passport';
import { Song } from 'src/schemas/song.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'songImage', maxCount: 1 },
      { name: 'song', maxCount: 1 },
    ])
  )
  createSong(@Req() req: any, @Body() createSongDto: CreateSongDto, @UploadedFiles() files: Array<Express.Multer.File>): Promise<Song> {
    return this.songService.createSong(req.user, createSongDto, files);
  }
}
