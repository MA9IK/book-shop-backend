import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { IUser } from 'src/users/user.interface'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { JsonWebKeyInput } from 'crypto'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}
	async signIn(email: string, pass: string): Promise<{ access_token: string }> {
		const user = await this.usersService.findOne(email)

		if (!user) throw new NotFoundException('User not found')
		const { password } = user
		const match = await bcrypt.compare(pass, password)

		if (!match) throw new UnauthorizedException()

		const payload = { sub: user._id, username: user.username }

		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}

	async signUp(CreateUserDto: CreateUserDto): Promise<IUser> {
		const newUser = await this.usersService.createNewUser(CreateUserDto)
		return newUser
	}
}
