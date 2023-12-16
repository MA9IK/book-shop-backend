import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../../schemas/user.schema'
import { CreateUserDto } from '../dto/create-user.dto'
import * as bcrypt from 'bcrypt'
import { updateUserDto } from '../dto/update-user.dto'
@Injectable()
export class UsersService {
	constructor(@InjectModel('Users') private userModel: Model<User>) {}

	async createNewUser(CreateUserDto: CreateUserDto): Promise<UserDocument> {
		const newUser = new this.userModel(CreateUserDto)

		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(newUser.password, salt)

		newUser.password = hashPassword
		return await newUser.save()
	}

	async login(email: string): Promise<UserDocument> {
		return await this.userModel.findOne({ email })
	}

	async findById(id: string): Promise<UserDocument> {
		try {
			return await this.userModel.findById(id)
		} catch (error) {
			console.error(error)
			throw new HttpException('User not found', HttpStatus.NOT_FOUND)
		}
	}

	async findByUsername(username: string): Promise<UserDocument> {
		const user = await this.userModel.findOne({ username })

		if (!user) throw new NotFoundException('User not found')
		return user
	}

	async update(
		id: string,
		updateUserDto: updateUserDto
	): Promise<UserDocument> {
		try {
			return await this.userModel
				.findByIdAndUpdate(id, updateUserDto, { new: true })
				.exec()
		} catch (error) {
			console.error(error)
			throw new HttpException('User not found', HttpStatus.NOT_FOUND)
		}
	}

	async remove(id: string): Promise<UserDocument> {
		const user = await this.userModel.findByIdAndDelete(id).exec()

		if (!user) throw new NotFoundException('User not found')
		return user
	}
}
