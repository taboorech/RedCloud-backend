import { Controller, Req, Get, UseGuards, Patch, Body, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/schemas/user.schema';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';

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

  @Get('/profile-info/:id')
  @UseGuards(AuthGuard('jwt'))
  getProfileInfo(@Req() req: any, @Param("id") userId: string): Promise<User> {
    return this.userService.getProfileInfo(req.user, userId);
  }

  @Patch('/')
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor('backgroundImage'))
  updateUserInfo(@Req() req: any, @Body() updateUserInfoDto: UpdateUserInfoDto, @UploadedFile() file: Express.Multer.File) { 
    return this.userService.updateUserInfo(req.user, updateUserInfoDto, file);
  }

  @Patch('/avatar')
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("avatarImage"))
  updateUserAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File): Promise<User> {
    return this.userService.updateUserAvatar(req.user, file);
  }
}
