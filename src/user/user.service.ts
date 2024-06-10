import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

  async getProfileInfo(user: User): Promise<User> {
    return await this.userModel.findOne({ _id: user._id }, "-password").populate("playlists songs");
  }

  async updateUserInfo(user: User, updateUserInfoDto: UpdateUserInfoDto, file: Express.Multer.File): Promise<User> { 
    const { settings } = updateUserInfoDto;
    const parseSettings = JSON.parse(settings);
    const parseFilePath = `images/${file.filename}`;
    return await this.userModel.findOneAndUpdate({ _id: user._id }, {...updateUserInfoDto, settings: parseSettings, backgroundImage: {path:  parseFilePath, originalname: file.originalname}}, { new: true });
  }
}
