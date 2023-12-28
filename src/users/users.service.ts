import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDocument } from '../schemas/user.schema'
import { updateUserDto } from './dto/update-user.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel('Users') private userModel: Model<UserDocument>,
		private jwtService: JwtService
	) {}
	async findByUsername(username: string): Promise<UserDocument> {
		const user = this.userModel.findOne({ username })

		if (!user) throw new NotFoundException('User not found')
		return user
	}

	async findByEmail(email: string): Promise<UserDocument> {
		const user = this.userModel.findOne({ email })

		if (!user) throw new NotFoundException('User not found')
		return user
	}

	async update(
		id: string,
		updateUserDto: updateUserDto
	): Promise<UserDocument> {
		try {
			const user = await this.userModel.findById(id)
			if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

			const salt = await bcrypt.genSalt(10)
			const hashPassword = await bcrypt.hash(updateUserDto.password, salt)

			user.password = hashPassword
			await user.save()

			return user
		} catch (error) {
			console.error(error)
			throw new BadRequestException('Something went wrong')
		}
	}

	async remove(id: string): Promise<UserDocument> {
		const user = this.userModel.findByIdAndDelete(id).exec()

		if (!user) throw new NotFoundException('User not found')
		return user
	}

	async validateToken(token: string) {
		return this.jwtService.verify(token, {
			secret: process.env.SECRET_KEY
		})
	}
}
