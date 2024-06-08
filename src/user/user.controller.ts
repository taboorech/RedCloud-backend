import { Controller, Req, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/schemas/user.schema';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Controller('user')
export class UserController {
  constructor (
    private userService: UserService
  ) {}

  @Get('/info')
  @UseGuards(AuthGuard('jwt'))
  getInfo(@Req() req: any): Promise<User> {
    return this.userService.getInfo(req.user);
  }

  @Get('/profile-info')
  @UseGuards(AuthGuard('jwt'))
  getProfileInfo(@Req() req: any): Promise<User> {
    return this.userService.getProfileInfo(req.user);
  }

  @Patch('/')
  @UseGuards(AuthGuard("jwt"))
  updateUserInfo(@Req() req: any, @Body() updateUserInfoDto: UpdateUserInfoDto): Promise<User> {
    return this.userService.updateUserInfo(req.user, updateUserInfoDto);
  }
}
