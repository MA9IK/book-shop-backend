import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>
@Schema()
export class User {
	@Prop({ unique: true, required: true, type: String })
	username: string

	@Prop({ unique: true, required: true, type: String })
	email: string

	@Prop({ required: true })
	password: string

	@Prop({ required: true })
	date: string

	@Prop({ type: String })
	avatar: string

	@Prop({ default: 'User' })
	role: [string]
}

export const UserSchema = SchemaFactory.createForClass(User)
