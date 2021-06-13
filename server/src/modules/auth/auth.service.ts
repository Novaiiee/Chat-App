import { Injectable } from "@nestjs/common";
import { RegisterDTO } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  async register(body: RegisterDTO) {
    
  }
}
