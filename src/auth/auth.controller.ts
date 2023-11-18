import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Res
} from '@nestjs/common'
import { Response } from 'express'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
// TODO: write doc for swagger of this methods

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async signIn(@Body() signInDto: CreateUserDto, @Res() res: Response) {
		try {
			const user = await this.authService.signIn(
				signInDto.email,
				signInDto.password
			)

			return res.status(HttpStatus.OK).json(user)
		} catch (error) {
			console.error(error)
			return res.status(HttpStatus.NOT_FOUND).json({
				statusCode: HttpStatus.NOT_FOUND,
				message: 'User not found'
			})
		}
	}

	@HttpCode(HttpStatus.OK)
	@Post()
	async signUp(@Body() signUpDto: CreateUserDto, @Res() res: Response) {
		try {
			const newUser = await this.authService.signUp(signUpDto)

			return res.status(HttpStatus.OK).json(newUser)
		} catch (error) {
			console.error(error)
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: 'Internal Server Error'
			})
		}
	}
}
