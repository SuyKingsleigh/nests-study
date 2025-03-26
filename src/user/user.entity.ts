import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'email',
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'password',
    length: 255,
    nullable: false,
  })
  password: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: string;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: string;

  static fromCreateUserDto(createUserDto: CreateUserDTO): UserEntity {
    let user = new UserEntity();
    
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    
    return user;
  }
  
  
  static fromUpdateUserDto(updateUserDto: UpdateUserDto): UserEntity {
    let user = new UserEntity();
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    return user;
  }
}
