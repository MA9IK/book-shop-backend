export class CreateUserDto {
	readonly username: string
	readonly firstName: string
	readonly lastName: string
	readonly email: string
	readonly password: string
	readonly date: Date
}