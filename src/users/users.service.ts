import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { IUser } from './user.interface'
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {
	constructor(@InjectModel('Users') private userModel: Model<User>) {}

	async findAll(): Promise<User[] | undefined> {
		const userData = await this.userModel.find()

		if (!userData || userData.length === 0) {
			throw new NotFoundException('Users data not found')
		}

		return userData
	}

	async findOne(email: string): Promise<IUser | undefined> {
		const user = await this.userModel.findOne({ email: email })
		return user
	}

	async createNewUser(CreateUserDto: CreateUserDto): Promise<IUser> {
		const newUser = new this.userModel(CreateUserDto)

		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(newUser.password, salt)

		newUser.password = hashPassword
		const userCollection = await newUser.save()

		return userCollection
	}
}
