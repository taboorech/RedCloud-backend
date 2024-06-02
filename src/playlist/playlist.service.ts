import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Playlist, PlaylistDocument } from 'src/schemas/playlist.schema';
import { PlaylistCreateDto } from './dto/playlist-create.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>
  ) {}

  async getPlaylists(user: User): Promise<Playlist[]> {
    const playlists = this.playlistModel.find({ _id: user.playlists });
    return playlists;
  }

  async getPlaylist(user: User, playlistId: string): Promise<Playlist> {
    return this.playlistModel.findOne({ _id: playlistId});
  }

  async createPlaylist(user: User, playlistCreateDto: PlaylistCreateDto): Promise<Playlist> {
    const { title } = playlistCreateDto;
    const playlist = new this.playlistModel({ title, owners: [user._id]});
    user.addPlaylist(playlist);
    return playlist.save();
  }
}
