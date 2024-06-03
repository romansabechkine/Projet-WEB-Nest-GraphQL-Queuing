import { Injectable } from '@nestjs/common';
import { Message } from './message.model';
import { CreateMessageInput } from '../dto/create-message-input';

@Injectable()
export class MessageService {
    private messages: Message[] = [];

    create(createMessageInput: CreateMessageInput): Message {
        const newMessage = new Message();
        newMessage.id = Date.now().toString();
        newMessage.content = createMessageInput.content;
        newMessage.timestamp = new Date();
        this.messages.push(newMessage);
        return newMessage;
    }

    findAll(): Message[] {
        return this.messages;
    }
}