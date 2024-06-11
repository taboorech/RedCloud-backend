import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from 'src/schemas/playlist.schema';
import { Song, SongSchema } from 'src/schemas/song.schema';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
      { name: Song.name, schema: SongSchema }
    ]),
    MulterModule.registerAsync({
      useFactory: async () => {
        return {
          storage: diskStorage({
            destination: async (req, file, cb) => {
              return cb(null, './public/images');
            },
            filename: (req, file, cb) => {
              return cb(null, `${Date.now()}-${Buffer.from(file.originalname, 'latin1').toString('utf8')}`);
            }
          })
        }
      },
    })
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService]
})
export class PlaylistModule {}
