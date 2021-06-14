import { Injectable } from "@nestjs/common";
import { JWT_SECRET } from "./../../common/constants";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }
  
  async validate(payload: { userID: string }) {
    return {
      userID: payload.userID,
    };
  }
}
