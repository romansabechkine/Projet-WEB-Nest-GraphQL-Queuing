import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {MessageService} from './message.service';
import {Message, MessageResponse} from './message.model';

@Resolver(() => Message)
export class MessageResolver {
    constructor(private readonly messageService: MessageService) {
    }

    @Mutation(() => MessageResponse)
    async createMessage(@Args('username') username: string, @Args('content') content: string, @Args('conversationId') conversationId: string) {
        return this.messageService.addMessageToQueue(username, content, conversationId);
    }

    @Query(() => [Message])
    async getMessages(@Args('conversationId') conversationId: string) {
        return this.messageService.getMessages(conversationId);
    }
}
