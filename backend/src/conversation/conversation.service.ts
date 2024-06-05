import {Injectable} from "@nestjs/common";
import {Conversation} from "./conversation.model";
import {Message} from "../message/message.model";

@Injectable()
export class ConversationService {
    private conversations: Conversation[] = [];

    async createConversation(userId1: string, userId2: string): Promise<Conversation> {
        const newConversation = new Conversation();
        newConversation.id = Date.now().toString();
        newConversation.userIds = [userId1, userId2];
        this.conversations.push(newConversation);
        return newConversation;
    }

    findAll(): Conversation[] {
        return this.conversations;
    }

    getMessages(conversationId: string): Message[] {
        const conversation = this.conversations.find(conversation => conversation.id === conversationId);
        return conversation ? conversation.messages : [];
    }
}