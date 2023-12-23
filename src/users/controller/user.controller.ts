import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	UseGuards,
} from '@nestjs/common'
import { UsersService } from '../service/users.service'
import { updateUserDto } from '../dto/update-user.dto'
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger'
import { AuthGuard } from '../auth.guard'

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
	@UseGuards(AuthGuard)
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
