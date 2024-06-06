import { Controller, Req, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/schemas/user.schema';

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
}
