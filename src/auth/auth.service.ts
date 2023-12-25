import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { UserDocument } from 'src/schemas/user.schema'
import { Model } from 'mongoose'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel('Users') private userModel: Model<UserDocument>,
		private jwtService: JwtService,
		private usersService: UsersService
	) {}
	async signIn(email: string, pass: string): Promise<{ access_token: string }> {
		// if (!email || !pass) throw new BadRequestException('Bad Request')
		const user = await this.userModel.findOne({ email })

		// if (!user) throw new NotFoundException('User not found')
		// const { password } = user
		// const match = await bcrypt.compare(pass, password)

		// if (!match) throw new NotFoundException("Password isn't right")

		const payload = { id: user._id, username: user.username, email: user.email }

		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}

	async signUp(
		CreateUserDto: CreateUserDto
	): Promise<{ access_token: string }> {
		const user = new this.userModel(CreateUserDto)

		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(user.password, salt)

		user.password = hashPassword
		await user.save()

		const payload = { id: user._id, username: user.username }
		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findByEmail(email)

		if (!user) throw new NotFoundException()

		const { password } = user
		const match = await bcrypt.compare(pass, password)
		if (user && match) {
			const { password, ...result } = user
			return result
		}
		return null
	}
}
