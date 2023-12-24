import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res,
	UseGuards
} from '@nestjs/common'
import { Response } from 'express'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger'
import { LoginUserDto } from 'src/users/dto/loginin-user.dto'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		description: 'Found Succesfully'
	})
	@ApiNotFoundResponse({ description: 'User not found' })
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@UseGuards(AuthGuard('local'))
	@Post('signin')
	async signIn(@Body() signInDto: LoginUserDto, @Res() res: Response) {
		try {
			const user = await this.authService.signIn(
				signInDto.email,
				signInDto.password
			)

			return res.status(HttpStatus.OK).json(user)
		} catch (error) {
			console.error(error)

			return res.status(error.status).json({
				statusCode: error.status,
				message: error.response.message
			})
		}
	}

	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ description: 'Created Succesfully' })
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@Post('signup')
	async signUp(@Body() signUpDto: CreateUserDto, @Res() res: Response) {
		try {
			const newUser = await this.authService.signUp(signUpDto)

			return res.status(HttpStatus.OK).json(newUser)
		} catch (error) {
			console.error(error)
			return res.status(HttpStatus.BAD_REQUEST).json({
				statusCode: HttpStatus.BAD_REQUEST,
				message: 'Bad Request'
			})
		}
	}
}
