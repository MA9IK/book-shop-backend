import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch
} from '@nestjs/common'
import { UsersService } from './users.service'
import { updateUserDto } from './dto/update-user.dto'
import {
	ApiBody,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data'
import { User } from 'src/schemas/user.schema'

@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(private readonly usersService: UsersService) {}
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		description: 'Update a user',
		summary: 'Update user'
	})
	@ApiParam({
		name: 'id',
		description: 'User ID',
		required: true
	})
	@ApiBody({
		description: 'User data',
		type: updateUserDto
	})
	@ApiResponse({
		status: 200,
		description: 'User updated successfully'
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden'
	})
	@FormDataRequest({ storage: MemoryStoredFile })
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: updateUserDto) {
		return this.usersService.update(id, updateUserDto)
	}

	@ApiOperation({
		description: 'Delete a user',
		summary: 'Delete a user from data base'
	})
	@ApiParam({
		name: 'id',
		description: 'User ID',
		required: true
	})
	@ApiBody({
		description: 'User data',
		type: updateUserDto
	})
	@ApiResponse({
		status: 200,
		description: 'User deleted successfully'
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden'
	})
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(id)
	}
}
