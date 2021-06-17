import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { hash } from "bcrypt";
import { Model } from "mongoose";
import { v4 } from "uuid";
import { User, UserDocument } from "./user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async findByID(id: string) {
    return this.userModel.findOne({ id });
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(user: Partial<User>) {
    return this.userModel.create({
      ...user,
      password: await hash(user.password, 12),
      id: v4(),
      chatRooms: [],
    });
  }
}
