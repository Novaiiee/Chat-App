import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, MinLength } from "class-validator";
import { Document } from "mongoose";

@Schema({ collection: "chat-app-users" })
export class User {
  @Prop()
  realName: string;

  @Prop()
  @MinLength(3)
  displayName: string;

  @Prop()
  @MinLength(6)
  password: string;

  @Prop()
  @IsEmail()
  email: string;

  @Prop()
  id: string;

  @Prop([String])
  chatRooms: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
