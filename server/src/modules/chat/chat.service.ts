import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 } from "uuid";
import { UserDocument } from "../user/user.model";
import { Chat, ChatDocument } from "./chat.model";

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>) { }

  async create(nameParam: string, user?: UserDocument) {
    const name = nameParam.split("+").join(" ");

    const doesRoomExist = await this.chatModel.findOne({ ownerID: user.id, name });
    if (doesRoomExist) throw new HttpException("room already exists", HttpStatus.BAD_REQUEST);

    const chatRoom = await this.chatModel.create({
      id: v4(),
      userIDs: [user.id],
      name: name,
      ownerID: user.id
    })

    return chatRoom;
  }
}
