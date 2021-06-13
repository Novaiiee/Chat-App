import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, MinLength } from "class-validator";

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
  userID: string;

  @Prop([String])
  chatRooms: string[]
}

export const UserSchema = SchemaFactory.createForClass(User);
