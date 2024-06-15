import { CreateSongDto } from './dto/create-song.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song, SongDocument } from 'src/schemas/song.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<SongDocument>
  ) {}

  async getSong(songId: string) {
    return await this.songModel.findOne({ _id: songId }).populate("authors", "_id login surname name imageUrl description");
  }

  async createSong(user: User, createSongDto: CreateSongDto, files: Array<Express.Multer.File>): Promise<Song> {
    const { title, album, duration } = createSongDto;
    const song = new this.songModel({title, songUrl: `/songs/${files["song"][0].filename}`, album, duration: duration, imageUrl: `/images/${files["songImage"][0].filename}`, authors: [user._id]});
    song.save();
    user.addSong(song);
    return song;
  }
}
