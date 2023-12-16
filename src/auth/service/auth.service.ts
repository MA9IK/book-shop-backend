import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UsersService } from 'src/users/service/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}
	async signIn(email: string, pass: string): Promise<{ access_token: string }> {
		if (!email || !pass) throw new BadRequestException('Bad Request')
		const user = await this.usersService.login(email)

		if (!user) throw new NotFoundException('User not found')
		const { password } = user
		const match = await bcrypt.compare(pass, password)

		if (!match) throw new NotFoundException('User not found')

		const payload = { id: user._id, username: user.username, email: user.email }

		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}

	async signUp(
		CreateUserDto: CreateUserDto
	): Promise<{ access_token: string }> {
		const user = await this.usersService.createNewUser(CreateUserDto)

		const payload = { id: user._id, username: user.username }
		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}
}
