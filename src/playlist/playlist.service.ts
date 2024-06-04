import { AddOwnerDto } from './dto/add-owner.dto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Playlist, PlaylistDocument } from 'src/schemas/playlist.schema';
import { PlaylistCreateDto } from './dto/playlist-create.dto';
import { User } from 'src/schemas/user.schema';
import { AddSongDto } from './dto/add-song.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>
  ) {}

  async getPlaylists(user: User): Promise<Playlist[]> {
    const playlists = await this.playlistModel.find({ _id: user.playlists });
    return playlists;
  }

  async getPlaylist(user: User, playlistId: string): Promise<{playlist: Playlist, isOwner: boolean} | NotAcceptableException> {
    const playlist = await this.playlistModel.findOne({ _id: playlistId});
    // if(!playlist.owners.find((owner => owner.toString() === user._id.toString())) || playlist.private) {
    // if(!playlist.owners.find((owner => owner.toString() === user._id.toString()))) {
    //   return new NotAcceptableException();
    // }

    let isOwner = false;
    if(playlist.owners.find((owner => owner.toString() === user._id.toString()))) {
      isOwner = true;
    } else if(playlist.private) {
      return new NotAcceptableException();
    }

    return { playlist, isOwner };
  }

  async addSong(user: User, playlistId: string, addSongDto: AddSongDto): Promise<Playlist | NotAcceptableException> {
    const playlist = await this.playlistModel.findOne({ _id: playlistId});
    if(!playlist.owners.find((owner => owner.toString() === user._id.toString()))) {
      return new NotAcceptableException();
    }

    playlist.addSong(addSongDto);
    return playlist;
  }

  async createPlaylist(user: User, playlistCreateDto: PlaylistCreateDto): Promise<Playlist> {
    const { title } = playlistCreateDto;
    const playlist = new this.playlistModel({ title, owners: [user._id] });
    user.addPlaylist(playlist);
    return playlist.save();
  }

  async addOwner(user: User, playlistId: string, addOwnerDto: AddOwnerDto): Promise<Playlist | NotAcceptableException> {
    const playlist = await this.playlistModel.findOne({ _id: playlistId});
    if(!playlist.owners.find((owner => owner.toString() === user._id.toString()))) {
      return new NotAcceptableException();
    }
    playlist.addOwner(addOwnerDto);
    return playlist;
  }
}
