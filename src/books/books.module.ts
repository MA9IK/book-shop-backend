import { Module } from '@nestjs/common'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { BookSchema } from 'src/schemas/book.schema'

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Books', schema: BookSchema }])],
	providers: [BooksService],
	controllers: [BooksController]
})
export class BooksModule {}
