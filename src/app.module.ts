import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [
    AuthModule,
    PlaylistModule,
    MongooseModule.forRoot('mongodb://localhost:27017/RedCloud'),
    ConfigModule.forRoot(),
  ],
  // controllers: [PlaylistController],
  // providers: [PlaylistService],
})
export class AppModule {}
