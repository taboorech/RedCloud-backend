import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Playlist } from './playlist.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: "profile.jpg" })
  imageUrl: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }] })
  playlists: Playlist[];

  addPlaylist: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.addPlaylist = async function (playlist: Playlist): Promise<Playlist[]> {
  const playlists = [...this.playlists];
  playlists.push(playlist);
  this.playlists = playlists;
  await this.save();
  return this.playlists;
}