import { Injectable } from '@nestjs/common'
import { CreateBookDto } from './dto/create-book.dto'
import { Book, BookDocument } from 'src/schemas/book.schema'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'

@Injectable()
export class BooksService {
	constructor(@InjectModel('Books') private bookModel: Model<BookDocument>) {}

	async createBook(CreateBookDto: CreateBookDto): Promise<BookDocument> {
		const book = new this.bookModel(CreateBookDto)
		book.rating = +CreateBookDto.rating
		book.pageCount = +CreateBookDto.pageCount

		return await book.save()
	}
}
