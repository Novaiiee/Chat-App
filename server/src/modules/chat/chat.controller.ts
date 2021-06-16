import {
  Controller,
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

  @UseGuards(JwtGuard)
  @Put("/add")
  async addUser(
    @Req() req,
    @Query("chatID") chatID: string,
    @Query("userID") userID: string
  ) {
    return this.chatService.addUser(req.user, userID, chatID);
  }

  @Get("/my")
  @UseGuards(JwtGuard)
  async allMyChats(@Req() req) {
    return this.chatService.myChats(req.user);
  }
}
