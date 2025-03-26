import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { ListUserDto } from './dto/ListUser.dto';
import { CreateUserDTO } from './dto/CreateUser.dto';

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
    let user = new UserEntity();
    
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    
    return this.userRepository.insert(user);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
