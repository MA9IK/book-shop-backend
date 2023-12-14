import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
	@ApiProperty({
		type: String,
		description: 'This is a required property'
	})
	readonly username: string
	@ApiProperty({
		type: String,
		description: 'This is a required property'
	})
	readonly email: string
	@ApiProperty({
		type: String,
		description: 'This is a required property'
	})
	readonly password: string
	@ApiProperty({
		type: String,
		description: 'This is a required property'
	})
	readonly date: string
}
