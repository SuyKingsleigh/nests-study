import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async registerUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();

    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;

    let user = await this.userService.save(userEntity);
    return { status: 'Usuário criado', user: user };
  }

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }
  
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findById(id);
  }
  
  
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return {
      status: 'Usuário atualizado',
      user: updatedUser,
    };
  }
  


  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    await this.userService.delete(id);
    return {
      status: 'Usuário deletado',
    };
  }
}
