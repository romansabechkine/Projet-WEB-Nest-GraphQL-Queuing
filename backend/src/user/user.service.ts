import {Injectable} from "@nestjs/common";
import {User} from "./user.model";
import {Conversation} from "../conversation/conversation.model";

@Injectable()
export class UserService {
    private users: User[] = [];

    createUser(username: string): User {
        const newUser = new User();
        newUser.id = Date.now().toString();
        newUser.username = username;
        this.users.push(newUser);
        return newUser;
    }

   findOne(id: string): User {
        return this.users.find(user => user.id === id);

   }

    getConversations(userId: string): Conversation[] {
        const user = this.users.find(user => user.id === userId);
        return user ? user.conversations : [];
    }

    findAll() {
        return [];
    }
}