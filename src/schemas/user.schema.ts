import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Playlist } from './playlist.schema';
import { Song } from './song.schema';
import { profile } from 'console';

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
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }] })
  songs: Song[];

  @Prop()
  refreshToken: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }] })
  playlists: Playlist[];

  @Prop({ required: true, type: raw({ songsListened: Number, songsFound: Number, songsLiked: Number, playlistsCreated: Number }), default: { songsListened: 0, songsFound: 0, songsLiked: 0, playlistsCreated: 0 }})
  stats: {
    songsListened: Number,
    songsFound: Number,
    songsLiked: Number,
    playlistsCreated: Number
  }

  @Prop({ 
    required: true,
    default: {
      profile: {},
      recommends: {},
      main: {},
      privacy: {}
    },
    type: raw({
      profile: raw({
        showPlaylists: {type: Boolean, default: false},
        showStats: {type: Boolean, default: false},
        showFavoriteAuthors: {type: Boolean, default: false},
        showFavoritePlaylists: {type: Boolean, default: false}
      }),
      recommends: {
        showFriendsListenSongs: {type: Boolean, default: false},
        showRecommendsSongsOnMainPage: {type: Boolean, default: false},
        showRecommendsPlaylistsOnMainPage: {type: Boolean, default: false},
        muchRecommendUserCountrySongs: {type: Boolean, default: false}
      },
      main: {
        getNotifications: {type: Boolean, default: false}
      },
      privacy: {
        privateProfile: {type: Boolean, default: false},
        showUserListeningSongs: {type: Boolean, default: false},
        twoStepVerification: {type: Boolean, default: false}
      }
    })
  })
  settings: {
    profile: {
      showPlaylists: boolean,
      showStats: boolean,
      showFavoriteAuthors: boolean,
      showFavoritePlaylists: boolean
    },
    recommends: {
      showFriendsListenSongs: boolean,
      showRecommendsSongsOnMainPage: boolean,
      showRecommendsPlaylistsOnMainPage: boolean,
      muchRecommendUserCountrySongs: boolean
    },
    main: {
      getNotifications: boolean
    },
    privacy: {
      privateProfile: boolean,
      showUserListeningSongs: boolean,
      twoStepVerification: boolean
    }
  }

  addPlaylist: Function;

  addSong: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.addPlaylist = async function (playlist: Playlist): Promise<Playlist[]> {
  const playlists = [...this.playlists];
  playlists.push(playlist);
  this.playlists = playlists;
  await this.save();
  return this.playlists;
}

UserSchema.methods.addSong = async function (song: Song): Promise<Song[]> {
  const songs = [...this.songs];
  songs.push(song);
  this.songs = songs;
  await this.save();
  return this.songs;
}