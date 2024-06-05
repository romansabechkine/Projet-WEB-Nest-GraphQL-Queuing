import {Args, Query, Resolver} from '@nestjs/graphql';
import {User} from './user.model';
import {UserService} from './user.service';
import {Conversation} from "../conversation/conversation.model";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {
    }

    @Query(() => [User])
    async users(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Query(() => [User])
    async CreateUser(@Args('username') username: string): Promise<User> {
        return this.userService.createUser(username);
    }

    @Query(() => User)
    async user(@Args('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Query(() => Conversation)
    async userConversations(@Args('id') id: string): Promise<Conversation[]> {
        return this.userService.getConversations(id);
    }

}