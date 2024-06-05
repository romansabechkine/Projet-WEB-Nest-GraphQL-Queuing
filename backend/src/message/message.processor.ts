import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { Logger } from '@nestjs/common';

@Processor('message-queue')
export class MessageProcessor {
  private readonly logger = new Logger(MessageProcessor.name);

  constructor(private readonly messageService: MessageService) {}

  @Process('saveMessage')
  async handleSaveMessage(job: Job<Message>) {
    this.logger.log(`Processing job: ${job.id} with data: ${JSON.stringify(job.data)}`);
    // Save the message
    this.messageService.saveMessage(job.data);
  }
}
