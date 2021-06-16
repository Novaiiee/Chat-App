import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JWT_SECRET } from "../common/constants";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }
  
  async validate(payload: { userID: string }) {
    const user = await this.authService.validateToken(payload);
    return user;
  }
}
