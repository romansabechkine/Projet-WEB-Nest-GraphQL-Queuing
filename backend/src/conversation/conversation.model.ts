import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "../user/user.model";
import { Message } from "../message/message.model";

@ObjectType()
export class Conversation {
    @Field(() => ID)
    id: string;

    @Field(() => [User])
    participants: User[];

    @Field(() => [String])
    userIds: string[];

    @Field(() => [Message], { nullable: true })
    messages?: Message[];
}