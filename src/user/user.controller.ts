import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "src/user/user.repository";
import { CreateUserDTO } from "./dto/CreateUser.dto";

@Controller('/user')
export class UserController {

    constructor(private userRepository: UserRepository) {

    }

    @Post()
    async registerUser(@Body() userData: CreateUserDTO) {
        this.userRepository.save(userData);
        return { status: 'Usuário criado', userData };
    }

    @Get()
    async getUsers() {
        return this.userRepository.getUsers();
    }

}