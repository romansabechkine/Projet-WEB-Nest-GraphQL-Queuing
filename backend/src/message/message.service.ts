import {Injectable} from '@nestjs/common';
import {Message} from './message.model';
import {PrismaService} from "../prisma.service";
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class MessageService {
    constructor(
        @InjectQueue('message') private messageQueue: Queue,
        private readonly prisma: PrismaService
        
    ) {}
    async createMessage(username : string, content : string, conversationId: string): Promise<Message>{
        const createdMessage = await this.prisma.message.create({
            data: {
                content: content,
                user: {
                    connect: {
                        username: username
                    }
                },
                conversation: {
                    connect: {
                        id: conversationId
                    }
                }
            }, include: {
                user: true
            }
        })
        const {userId, ...rest} = createdMessage;
        return createdMessage;
    }

    async addMessageToQueue(username : string, content : string, conversationId: string) {
        
        const job = await this.messageQueue.add(
            'message',
          {
            username : username,
            content : content,
            conversationId: conversationId,
          },
         );
         console.log("JOB:")
         console.log(username)
         console.log(content)
         console.log(conversationId)

         return {
            status: "OK"
            }
        }

       

    async getMessages(conversationId: string): Promise<Message[]>{
        const messages = await this.prisma.message.findMany({
            where: {
                conversationId: conversationId
            },
            include: {
                user: true
            }
        });
        return messages;
    }
}
