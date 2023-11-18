import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { User } from 'src/schemas/user.schema'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { IUser } from 'src/users/user.interface'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}
	async signIn(email: string, pass: string): Promise<IUser> {
		const user = await this.usersService.findOne(email)

		if (!user) throw new NotFoundException('User not found')
		const { password } = user
		const match = await bcrypt.compare(pass, password)

		if (!match) throw new UnauthorizedException()
		return user
	}

	async signUp(CreateUserDto: CreateUserDto): Promise<IUser> {
		const newUser = await this.usersService.createNewUser(CreateUserDto)
		return newUser
	}
}
