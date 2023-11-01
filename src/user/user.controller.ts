import { Controller, Get, Body, Post, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  async setUser(@Body() userDto: UserDto) {
    if (userDto.thumb !== undefined) {
    }
    return this.userService.setUser(userDto);
  }

  @Delete(':uuid')
  async deleteUser(@Param('uuid') uuid: string) {
    return this.userService.deleteUser(uuid);
  }
}
