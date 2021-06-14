import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UserService } from "./../user/user.service";
import { AuthResult, LoginDTO, RegisterDTO } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(body: RegisterDTO): Promise<AuthResult> {
    const user = await this.userService.create(body);
    const token = this.generateToken(user.id);

    delete user.password;
    
    return {
      user,
      token,
    };
  }

  async login(body: LoginDTO): Promise<AuthResult> {
    const user = await this.validateUser(body);
    const token = this.generateToken(user.id);

    return { user, token };
  }

  async validateUser(body: LoginDTO) {
    const user = await this.userService.findByEmail(body.email);
    if (!user) throw new HttpException("user not found", HttpStatus.NOT_FOUND);

    const isPasswordValid = await compare(body.password, user.password);
    if (!isPasswordValid)
      throw new HttpException(
        "password is invalid",
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    return user;
  }

  generateToken(userID: string) {
    return this.jwtService.sign({ userID });
  }
}
