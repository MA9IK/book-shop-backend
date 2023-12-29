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

	@Prop({
		default:
			'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmiamistonesource.com%2Fno-avatar-25359d55aa3c93ab3466622fd2ce712d1%2F&psig=AOvVaw1jMglY8dJoFtrhncPJT7Rd&ust=1703948842052000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCJD40J_2tIMDFQAAAAAdAAAAABAQ'
	})
	avatar: string

	@Prop({ default: 'User' })
	role: [string]
}

export const UserSchema = SchemaFactory.createForClass(User)
