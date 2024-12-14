import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AbstractController } from 'src/abstractions/abstract.controller';
import { ResetPasswordDto, UserDto } from './dto/user.dto';
import bcrypt from 'bcrypt';

@Controller('users')
export class UserController extends AbstractController {
  constructor(private userService: UserService) {
    super();
  }

  @Get(':entity')
  async findOne(@Param('entity') entity: string, @Query('type') type: string) {
    return await this.userService.findOne(entity, type);
  }

  @Post()
  async create(@Body() dto: UserDto) {
    return await this.userService.create(dto);
  }

  @Patch(':id')
  async resetPassword(@Param('id') id: string, @Body() dto: ResetPasswordDto) {
    return await this.userService.resetPassword(id, dto);
  }

  // Todo: implement this method
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {}
}
