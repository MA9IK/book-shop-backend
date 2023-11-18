import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>
// TODO: swagger doc
@Schema()
export class User {
	@Prop({ required: true })
	username: string

	@Prop()
	firstName: string

	@Prop()
	lastName: string

	@Prop({ required: true })
	email: string

	@Prop({ required: true })
	password: string

	@Prop({ required: true })
	date: string
}

export const UserSchema = SchemaFactory.createForClass(User)
