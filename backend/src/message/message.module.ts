import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import {PrismaService} from "../prisma.service";
import { MessageConsumer } from './message.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message',
    }),
  ],
  providers: [MessageConsumer, MessageService, MessageResolver, PrismaService],
})
export class MessageModule {}
