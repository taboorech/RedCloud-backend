import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { unlink } from 'fs';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor (
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getInfo(user: User): Promise<User> {
    return await this.userModel.findOne({ _id: user._id }, "_id login imageUrl");
  }

  async getProfileInfo(user: User, userId: string): Promise<User> {
    return await this.userModel.findOne({ _id: userId }, "-password").populate("playlists songs");
  }

  async updateUserAvatar(user: User, file: Express.Multer.File): Promise<User> {
    let parseFilePath = "";
    if(file) {
      unlink(`public/${user.imageUrl}`, err => {
        err && console.log(err);
      });
      parseFilePath = `/images/${file.filename}`;
    }

    if(!parseFilePath) {
      return;
    }

    return await this.userModel.findOneAndUpdate({ _id: user._id }, { imageUrl: parseFilePath }, { new: true });
  }

  async updateUserInfo(user: User, updateUserInfoDto: UpdateUserInfoDto, file: Express.Multer.File): Promise<User> { 
    const { settings } = updateUserInfoDto;
    const data = {...updateUserInfoDto, backgroundImage: user.backgroundImage};
    if(settings) {
      const parseSettings = JSON.parse(settings);
      data.settings = parseSettings;
    }    
      
    if(file) {
      unlink(`public/${user.backgroundImage.path}`, err => {
        err && console.log(err);
      });
      const parseFilePath = `/images/${file.filename}`;
      data.backgroundImage = {
        path:  parseFilePath,
        originalname: file.originalname
      }
    }
    return await this.userModel.findOneAndUpdate({ _id: user._id }, {...data}, { new: true });
  }
}
