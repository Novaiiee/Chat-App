import { User } from "./user.model";
import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
