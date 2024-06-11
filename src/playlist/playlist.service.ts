import { Playlist } from './../schemas/playlist.schema';
import { AddOwnerDto } from './dto/add-owner.dto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PlaylistDocument } from 'src/schemas/playlist.schema';
import { PlaylistCreateDto } from './dto/playlist-create.dto';
import { User } from 'src/schemas/user.schema';
import { AddSongDto } from './dto/add-song.dto';
import { Song, SongDocument } from 'src/schemas/song.schema';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { unlink } from 'fs';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<SongDocument>,
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>
  ) {}

  async getPlaylists(user: User): Promise<Playlist[]> {
    const playlists = await this.playlistModel.find({ _id: user.playlists });
    return playlists;
  }

  async getPlaylist(user: User, playlistId: string): Promise<{playlist: Playlist, isOwner: boolean} | NotAcceptableException> {
    const playlist = await this.playlistModel.findOne({ _id: playlistId}).populate({
      path : 'songs',
      populate : {
        path : 'authors'
      }
    });;
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

    const { songId } = addSongDto;
    const song = await this.songModel.findOne({ _id: songId });
    playlist.addSong(song);
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

  async updatePlaylist(user: User, playlistId: string, updatePlaylistDto: UpdatePlaylistDto, file: Express.Multer.File): Promise<Playlist> {
    const playlist = await this.playlistModel.findOne({ _id: playlistId });

    const data = {...updatePlaylistDto, imageUrl: playlist.imageUrl};

    if(file) {
      unlink(`public/${playlist.imageUrl}`, err => {
        err && console.log(err);
      });
      const parseFilePath = `/images/${file.filename}`;
      data.imageUrl = parseFilePath;
    }

    await playlist.updateOne({...data}, { new: true });

    return playlist;
  }
}
