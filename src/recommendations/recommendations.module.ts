import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from 'src/schemas/playlist.schema';
import { Song, SongSchema } from 'src/schemas/song.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';

@Module({
  imports: [MongooseModule.forFeature([
    {name: User.name, schema: UserSchema},
    {name: Song.name, schema: SongSchema},
    {name: Playlist.name, schema: PlaylistSchema}
  ])],
  providers: [RecommendationsService],
  controllers: [RecommendationsController]
})
export class RecommendationsModule {}
