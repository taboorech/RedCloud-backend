import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist, PlaylistDocument } from 'src/schemas/playlist.schema';
import { Song, SongDocument } from 'src/schemas/song.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class RecommendationsService {
  constructor (
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Song.name) private songModel: Model<SongDocument>,
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>
  ) {}

  async getRecommendations() {
    const songs = await this.songModel.aggregate([{ $sample: {size: 10} }]);
    const playlists = await this.playlistModel.aggregate([
      { $match: { private: false } },
      { $sample: { size: 10 } }
    ]);
    
    const users = await this.userModel.aggregate([
      {
        $project: {
          password: 0,
        },
      },
      { $sample: { size: 10 } }
    ]);

    return { users, songs, playlists }
  }
}
