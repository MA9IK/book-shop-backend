import { Document } from 'mongoose'

export interface IUser extends Document {
	readonly username: string
	readonly firstName: string
	readonly lastName: string
	readonly email: string
	readonly password: string
	readonly date: string
}
