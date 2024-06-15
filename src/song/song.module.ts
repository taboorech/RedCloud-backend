import { FileTypeValidator, Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from 'src/schemas/song.schema';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Song.name, schema: SongSchema}
    ]),
    MulterModule.registerAsync({
      useFactory: async () => {
        return {
          storage: diskStorage({
            destination: async (req, file, cb) => {
              const validator = new FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/,
              })
              if(validator.isValid(file))
                return cb(null, './public/images');
              return cb(null, './public/songs');
              // return cb(null, './public/images');
            },
            filename: (req, file, cb) => {
              return cb(null, `${Date.now()}-${Buffer.from(file.originalname, 'latin1').toString('utf8')}`);
            }
          })
        }
      },
    })
  ],
  controllers: [SongController],
  providers: [SongService]
})
export class SongModule {}
