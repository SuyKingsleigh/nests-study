import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { ListUserDto } from './dto/ListUser.dto';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    const savedUsers = await this.userRepository.find();
    return savedUsers.map((_sUsers) => {
      new ListUserDto(_sUsers.id, _sUsers.name);
    });
  }

  async save(createUserDto: CreateUserDTO) {
    let user = UserEntity.fromCreateUserDto(createUserDto);

    return this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
  
  async findById(id: string) {
    return await this.userRepository.findOneBy({
      id
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(
      id,
      UserEntity.fromUpdateUserDto(updateUserDto),
    );
  }
  
  async delete(id: string) {
    return this.userRepository.softDelete(id);
  }
}
