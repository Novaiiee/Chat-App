import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
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

  @Delete("delete/:id")
  @UseGuards(JwtGuard)
  async delete(@Param("id") id: string, @Req() req) {
    return this.chatService.delete(id, req.user);
  }

  @UseGuards(JwtGuard)
  @Put("/add")
  async addUser(
    @Req() req,
    @Query("chatID") chatID: string,
    @Query("userID") userID: string
  ) {
    return this.chatService.addUser(req.user, userID, chatID);
  }

  @UseGuards(JwtGuard)
  @Delete("/remove")
  async removeUser(
    @Req() req,
    @Query("chatID") chatID: string,
    @Query("userID") userID: string
  ) {
    return this.chatService.removeUser(req.user, userID, chatID);
  }

  @Get("/my")
  @UseGuards(JwtGuard)
  async allMyChats(@Req() req) {
    return this.chatService.myChats(req.user);
  }
}
