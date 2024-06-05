import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MessageProcessor } from './message.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  providers: [MessageService, MessageResolver, MessageProcessor],
})
export class MessageModule {}
