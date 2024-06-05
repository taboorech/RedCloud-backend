import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { AddSongDto } from 'src/playlist/dto/add-song.dto';
import { Song } from './song.schema';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema()
export class Playlist {
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: 0 })
  duration: number;

  @Prop({ required: true, default: true })
  private: boolean;

  @Prop({ required: true, default: "/images/playlist.jpg" })
  imageUrl: string;

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }] })
  songs: Song[];

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  owners: User[];

  addOwner: Function;
  
  addSong: Function;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);

PlaylistSchema.methods.addOwner = async function (owner: User): Promise<User[]> {
  const owners = [...this.owners];
  owners.push(owner);
  this.owners = owners;
  await this.save();
  return this.owners;
}

PlaylistSchema.methods.addSong = async function (song: Song): Promise<{ title: string; author: User; album: string; duration: number }[]> {
  const songs = [...this.songs];
  songs.push(song._id);
  this.duration += song.duration;
  this.songs = songs;
  await this.save();
  return this.songs;
}