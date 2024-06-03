import {Module} from "@nestjs/common";
import {MessageResolver} from "./message.resolver";

@Module({
    providers: [MessageService, MessageResolver],
})
export class MessageModule {
}