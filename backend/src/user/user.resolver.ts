import {Query, Resolver, Args, Mutation} from '@nestjs/graphql';
import {User} from './user.model';
import {UserService} from './user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {
    }

    @Query(() => [User])
    async users(): Promise<User[]> {
        return this.userService.findAll();
    }
}