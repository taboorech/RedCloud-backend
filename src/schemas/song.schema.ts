import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type SongDocument = HydratedDocument<Song>;

@Schema()
export class Song {
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  songUrl: string;

  @Prop({ required: true, ref: 'User' })
  authors: User[];

  @Prop({ required: true })
  album: string;

  @Prop({ required: true, default: "/images/song.jpg" })
  imageUrl: string;

  @Prop({ required: true })
  duration: number;
}

export const SongSchema = SchemaFactory.createForClass(Song);