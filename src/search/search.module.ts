import { SearchController } from './search.controller';
import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Song, SongSchema } from 'src/schemas/song.schema';
import { Playlist, PlaylistSchema } from 'src/schemas/playlist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name: Song.name, schema: SongSchema},
      {name: Playlist.name, schema: PlaylistSchema}
    ])
  ],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
