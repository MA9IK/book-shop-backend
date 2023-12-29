import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { UsersService } from './users.service'
import { updateUserDto } from './dto/update-user.dto'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data'
import { FileInterceptor } from '@nestjs/platform-express'

@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(private readonly usersService: UsersService) {}
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		description: 'Successfully'
	})
	@ApiNotFoundResponse({ description: 'User not found' })
	@FormDataRequest({ storage: MemoryStoredFile })
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
