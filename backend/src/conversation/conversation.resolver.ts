import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {Conversation} from "./conversation.model";
import {ConversationService} from "./conversation.service";
import {Message} from "../message/message.model";

@Resolver(()=> Conversation)
export class ConversationResolver {
constructor(private conversationService: ConversationService) {
}
@Query(()=> [Conversation])
async conversations() {
return this.conversationService.findAll();
}
    @Query(() => [Message])
    async getMessages(@Args('conversationId') conversationId: string) {
        return this.conversationService.getMessages(conversationId);
    }
    @Mutation(() => Conversation)
    async createConversation(@Args('userId1') userId1: string, @Args('userId2') userId2: string) {
        return this.conversationService.createConversation(userId1, userId2);
    }
}