import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../common/jwt.guard";
import { AuthService } from "./auth.service";
import { LoginDTO, RegisterDTO } from "./auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  async register(@Body() body: RegisterDTO) {
    return this.authService.register(body);
  }

  @Post("/login")
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  @Get("/protected")
  @UseGuards(JwtGuard)
  async protectedRoute(@Req() req) {
    return req.user;
  }
}
