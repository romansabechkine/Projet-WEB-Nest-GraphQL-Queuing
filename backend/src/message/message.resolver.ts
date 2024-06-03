import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { CreateMessageInput } from './dto/create-message.input';

@Resolver(() => Message)
export class MessageResolver {
    constructor(private readonly messageService: MessageService) {}

    @Query(() => [Message], { name: 'getAllMessages' })
    async getMessages() {
        return this.messageService.findAll();
    }

    @Mutation(() => Message)
    async createMessage(@Args('createMessageInput') createMessageInput: CreateMessageInput) {
        return this.messageService.create(createMessageInput);
    }

}