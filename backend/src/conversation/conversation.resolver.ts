import {Query, Resolver} from "@nestjs/graphql";
import {Conversation} from "./conversation.model";
import {ConversationService} from "./conversation.service";

@Resolver(()=> Conversation)
export class ConversationResolver {
constructor(private conversationService: ConversationService) {
}
@Query(()=> [Conversation])
async conversations() {
return this.conversationService.findAll();
}
}