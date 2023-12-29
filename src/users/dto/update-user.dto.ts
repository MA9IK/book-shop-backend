import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class updateUserDto {
	@ApiProperty({
		type: String,
		description: 'This is a required property'
	})
	@IsString()
	@MinLength(3)
	readonly username: string

	@ApiProperty({
		type: String,
		description: 'This is a required property'
	})
	@IsEmail()
	@IsString()
	readonly email: string

	@ApiProperty({
		type: String,
		description: 'This is a required property'
	})
	@IsString()
	@MinLength(6)
	readonly password: string

	readonly avatar: any // change type here
}
