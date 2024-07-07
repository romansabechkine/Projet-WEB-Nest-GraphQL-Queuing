import { OnQueueEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from 'src/prisma.service';

@Processor('message')
export class MessageConsumer extends WorkerHost {
    constructor(private prisma: PrismaService){
        super();
    }
  
  async process(job: Job<any, any, string>): Promise<any> {
    console.log("INSIDE PROCESS")
    console.log(job)
    const {username, content, conversationId} = job.data
    console.log("DATA")
    console.log(job["data"])
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
    console.log("Created message:")
    console.log(createdMessage)
    return createdMessage;
  }

//   @OnQueueEvent('active')
//   onActive(job: Job) {
//     console.log('Processing job: ', job.id, ' with data ', job.data);
//    }
}