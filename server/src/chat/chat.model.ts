import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "chat-app-rooms" })
export class Chat {
  @Prop([String])
  userIDs: string[];

  @Prop()
  id: string;

  @Prop()
  ownerID: string;

  @Prop()
  name: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
export type ChatDocument = Chat & Document;