import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../common/jwt.guard";
import { LoginDTO, RegisterDTO } from "./auth.dto";
import { AuthService } from "./auth.service";

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

  @Post("/login-jwt")
  @UseGuards(JwtGuard)
  async loginJwt(@Req() req) {
    const token = this.authService.generateToken(req.user.id);
    
    return {
      user: req.user,
      token
    }
  }

  @Get("/protected")
  @UseGuards(JwtGuard)
  async protectedRoute(@Req() req) {
    return req.user;
  }
}
