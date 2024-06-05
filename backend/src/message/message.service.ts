import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
import { Message } from './message.model';
import { CreateMessageInput } from '../dto/create-message-input';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);
  private messages: Message[] = [];

  constructor(@InjectQueue('message-queue') private readonly messageQueue: Queue) {}

  async create(createMessageInput: CreateMessageInput): Promise<Message> {
    const newMessage = new Message();
    newMessage.id = Date.now().toString();
    newMessage.content = createMessageInput.content;
    newMessage.timestamp = new Date();
    this.logger.log(`Adding message to queue: ${JSON.stringify(newMessage)}`);
    await this.messageQueue.add('saveMessage', newMessage);
    return newMessage;
  }

  findAll(): Message[] {
    return this.messages;
  }

  saveMessage(message: Message) {
    this.messages.push(message);
    this.logger.log(`Message saved: ${JSON.stringify(message)}`);
  }
}
