import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Conversation } from '../conversation/conversation.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.id = Date.now().toString();
    newUser.username = username;
    newUser.password = hashedPassword;
    newUser.conversations = [];
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

  findAll(): User[] {
    return this.users;
  }
}
