import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema}
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
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
