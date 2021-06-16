import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 } from "uuid";
import { UserDocument } from "../user/user.model";
import { Chat, ChatDocument } from "./chat.model";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>
  ) {}

  async create(nameParam: string, user: UserDocument) {
    const name = nameParam.split("+").join(" ");

    const doesRoomExist = await this.chatModel.findOne({
      ownerID: user.id,
      name,
    });
    if (doesRoomExist)
      throw new HttpException("room already exists", HttpStatus.BAD_REQUEST);

    const chatRoom = await this.chatModel.create({
      id: v4(),
      userIDs: [user.id],
      name: name,
      ownerID: user.id,
    });

    return chatRoom;
  }

  async delete(id: string, user: UserDocument) {
    const chat = await this.chatModel.findOne({ id });

    if (!chat)
      throw new HttpException("room does not exist", HttpStatus.BAD_REQUEST);
    if (chat.ownerID !== user.id)
      throw new HttpException("not owner", HttpStatus.UNAUTHORIZED);
    
    try {
      await chat.delete();
      return true;
    } catch (e) {
      throw new HttpException("cannot delete chat", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async myChats(user: UserDocument) {
    return this.chatModel.find({ userIDs: user.id });
  }

  async addUser(user: UserDocument, otherUserID: string, chatID: String) {
    let chat = await this.chatModel.findOne({ id: chatID });

    if (!chat)
      throw new HttpException("room does not exist", HttpStatus.BAD_REQUEST);
    if (chat.ownerID !== user.id)
      throw new HttpException("not owner", HttpStatus.UNAUTHORIZED);
    if (chat.userIDs.includes(otherUserID))
      throw new HttpException("user already added", HttpStatus.BAD_REQUEST);

    chat.userIDs = [...chat.userIDs, otherUserID];
    chat = await chat.save();

    return chat;
  }

  async removeUser(user: UserDocument, otherUserID: string, chatID: String) {
    let chat = await this.chatModel.findOne({ id: chatID });

    if (!chat)
      throw new HttpException("room does not exist", HttpStatus.BAD_REQUEST);
    if (chat.ownerID !== user.id)
      throw new HttpException("not owner", HttpStatus.UNAUTHORIZED);
    if (!chat.userIDs.includes(otherUserID))
      throw new HttpException("user not added to chat", HttpStatus.BAD_REQUEST);

    chat.userIDs = chat.userIDs.filter((id) => id !== otherUserID);
    chat = await chat.save();

    return chat;
  }
}
