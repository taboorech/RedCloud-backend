import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistModule } from './playlist/playlist.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SongModule } from './song/song.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    PlaylistModule,
    SongModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/RedCloud'),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', "public"),
      renderPath: '/images' || "/songs",
    }),
  ],
})
export class AppModule {}