import {
	Body,
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	Param,
	Patch
} from '@nestjs/common'
import { UsersService } from './users.service'
import { updateUserDto } from './dto/update-user.dto'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(private readonly usersService: UsersService) {}
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
