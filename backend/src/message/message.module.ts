import {Module} from "@nestjs/common";
import {MessageResolver} from "./message.resolver";
import {MessageService} from "./message.service";

@Module({
    providers: [MessageService, MessageResolver],
})
export class MessageModule {
}