import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class User extends Document {
    @Prop({ unique: true })
    email: string

    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);

