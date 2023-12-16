import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Res
} from '@nestjs/common'
import { UsersService } from '../service/users.service'
import { updateUserDto } from '../dto/update-user.dto'
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger'
import { Response } from 'express'

@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(private readonly usersService: UsersService) {}

	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		description: 'Successfully'
	})
	@ApiNotFoundResponse({ description: 'User not found' })
	@Get(':id')
	findById(@Param('id') id: string) {
		return this.usersService.findById(id)
	}

	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		description: 'Successfully'
	})
	@ApiNotFoundResponse({ description: 'User not found' })
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: updateUserDto) {
		return this.usersService.update(id, updateUserDto)
	}

	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		description: 'Successfully'
	})
	@ApiNotFoundResponse({ description: 'User not found' })
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(id)
	}
}
