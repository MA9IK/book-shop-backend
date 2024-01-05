import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class updateUserDto {
	@ApiProperty({
		type: String,
		description: 'This is a required property'
	})
	@IsString()
	@MinLength(3)
	@IsOptional()
	readonly username: string

	@ApiProperty({
		type: String,
		description: 'This is a required property'
	})
	@IsEmail()
	@IsOptional()
	@IsString()
	readonly email: string

	@ApiProperty({
		type: String,
		description: 'This is a required property'
	})
	@IsString()
	@IsOptional()
	@MinLength(6)
	readonly password: string

	@IsOptional()
	readonly avatar: any // change type here
}
