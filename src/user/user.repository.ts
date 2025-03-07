import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    private users = [];

    async save(user) {
        //@ts-ignore
        this.users.push(user);
        console.log(`save() ${JSON.stringify(this.users)}`);
    }

    async getUsers() {
        return this.users;
    }

}