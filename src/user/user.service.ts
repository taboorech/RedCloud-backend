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
}
