import { IsString, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateBookDto {
	@ApiProperty({ description: 'Title of the book', type: String })
	@IsString({ message: 'Title must be a string' })
	readonly title: string

	@ApiProperty({ description: 'Subtitle of the book', type: String })
	@IsString({ message: 'SubTitle must be a string' })
	readonly subTitle: string

	@ApiProperty({ description: 'Rating of the book', type: Number })
	@IsNumber({}, { message: 'Rating must be a number' })
	readonly rating: number

	@ApiProperty({ description: 'Description of the book', type: String })
	@IsString({ message: 'Description must be a string' })
	readonly description: string

	@ApiProperty({ description: 'URL to the image of the book', type: String })
	@IsString({ message: 'Image must be a string' })
	readonly image: string

	@ApiProperty({ description: 'Published date of the book', type: String })
	@IsString({ message: 'PublishedAt must be a string' })
	readonly publishedAt: string

	@ApiProperty({
		description: 'Country of origin for the book',
		type: String
	})
	@IsString({ message: 'Country must be a string' })
	readonly country: string

	@ApiProperty({ description: 'Genre of the book', type: String })
	@IsString({ message: 'Genre must be a string' })
	readonly genre: string

	@ApiProperty({ description: 'Series information', type: String })
	@IsString({ message: 'Seria must be a string' })
	readonly seria: string

	@ApiProperty({ description: 'Publisher information', type: String })
	@IsString({ message: 'Publishing must be a string' })
	readonly publishing: string

	@ApiProperty({ description: 'Language of the book', type: String })
	@IsString({ message: 'Language must be a string' })
	readonly language: string

	@ApiProperty({ description: 'Number of pages in the book', type: Number })
	@IsNumber({}, { message: 'PageCount must be a number' })
	readonly pageCount: number
}
