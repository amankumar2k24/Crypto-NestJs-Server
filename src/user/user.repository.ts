import { Injectable } from "@nestjs/common";
import { User } from "./models/User";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name)
        private readonly user: Model<User>
    ) { }

    async insertOne(data: Partial<User>): Promise<User> {
        const newUser = new this.user(data);
        return await newUser.save();
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.user.findOne({ email })
    }
}