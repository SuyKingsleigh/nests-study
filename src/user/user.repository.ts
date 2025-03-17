import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async existsByEmail(email: string) {
    //@ts-ignore`
    const found = this.users.find((user) => user.email === email);
    return found !== undefined;
  }

  async save(user: UserEntity) {
    //@ts-ignore
    this.users.push(user);
    console.log(`save() ${JSON.stringify(this.users)}`);
  }

  async getUsers() {
    return this.users;
  }

  // o partial indica que todas propriedades do objeto sao opcionais
  async updateUser(id: string, updateUserDto: Partial<UpdateUserDto>) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    Object.entries(updateUserDto).forEach(([key, value]) => {
      if (key === 'id') return;
      user[key] = value;
    });

    return user;
  }
  
  async delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
