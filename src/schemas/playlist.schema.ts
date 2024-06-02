import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema()
export class Playlist {
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: 0 })
  duration: number;

  @Prop({ required: true, type: [{title: {type: String}, author: mongoose.Schema.Types.ObjectId, album: String, duration: Number }] })
  songs: {
    title: string;
    author: User;
    album: string;
    duration: number;
  }[];

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  owners: User[];

  addOwner: Function;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);

PlaylistSchema.methods.addOwner = async function (owner: User): Promise<User[]> {
  const owners = [...this.owners];
  owners.push(owner);
  this.owners = owners;
  await this.save();
  return this.owners;
}