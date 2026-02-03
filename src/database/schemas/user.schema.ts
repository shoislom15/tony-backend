import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
export class UserSettings {
  @Prop({ default: 'en' })
  language: string;

  @Prop({ default: 'UTC' })
  timezone: string;

  @Prop({ default: true })
  emailNotifications: boolean;

  @Prop({ default: true })
  telegramNotifications: boolean;
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ sparse: true, unique: true })
  telegramId?: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: UserSettings, default: () => ({}) })
  settings: UserSettings;

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
