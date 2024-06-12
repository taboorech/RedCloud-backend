import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist, PlaylistDocument } from 'src/schemas/playlist.schema';
import { Song, SongDocument } from 'src/schemas/song.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { SearchRequestDto } from './dto/search-request.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Song.name) private songModel: Model<SongDocument>,
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
  ) {}

  async search(user: User, searchRequestDto: SearchRequestDto) {
    const { request } = searchRequestDto
    const regex = new RegExp(request, 'i');

    try {
      const [users, playlists, songs] = await Promise.all([
        this.userModel.find({ $or: [{ login: regex }, { description: regex }, { country: regex }] }, "-password").populate("songs"),
        this.playlistModel.find({ $and: [{ title: regex }, { private: false }] }),
        this.songModel.find({ title: regex }).populate("authors"),
      ]);

      return { users, playlists, songs };
    } catch (error) {
      console.error('Error searching collections:', error);
      throw error;
    }
  }
}
