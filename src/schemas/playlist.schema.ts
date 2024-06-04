import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { AddSongDto } from 'src/playlist/dto/add-song.dto';

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

  @Prop({ required: true, type: [{title: {type: String}, songUrl: { type: String }, author: {type: mongoose.Schema.Types.ObjectId}, album: {type: String}, imageUrl: {type: String, default: "/images/song.jpg"}, duration: {type: Number} }] })
  songs: {
    title: string;
    songUrl: string;
    author: User;
    album: string;
    imageUrl: string;
    duration: number;
  }[];

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

PlaylistSchema.methods.addSong = async function (addSongDto: AddSongDto): Promise<{ title: string; author: User; album: string; duration: number }[]> {
  const songs = [...this.songs];
  songs.push(addSongDto);
  this.duration += addSongDto.duration;
  this.songs = songs;
  await this.save();
  return this.songs;
}