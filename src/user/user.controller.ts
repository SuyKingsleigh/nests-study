import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { ListUserDto } from './dto/ListUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('/user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async registerUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();

    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.id = uuid();

    await this.userRepository.save(userEntity);
    return { status: 'Usuário criado', user: userEntity };
  }

  @Get()
  async getUsers() {
    let users = await this.userRepository.getUsers();
    return users.map((user) => new ListUserDto(user.id, user.name));
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userRepository.updateUser(id, updateUserDto);
    return {
      status: 'Usuário atualizado',
      user: updatedUser,
    };
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    await this.userRepository.delete(id);
    return {
      status: 'Usuário deletado',
    };
  }
}
