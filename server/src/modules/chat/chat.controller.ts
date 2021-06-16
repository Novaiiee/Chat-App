import { Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../common/jwt.guard";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("/create/:name")
  @UseGuards(JwtGuard)
  async create(@Param("name") name: string, @Req() req) {
    const chat = await this.chatService.create(name, req.user);
    return chat;
  }
}
