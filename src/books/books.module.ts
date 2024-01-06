import { Module } from '@nestjs/common'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { BookSchema } from 'src/schemas/book.schema'
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Books', schema: BookSchema }]),
		NestjsFormDataModule.config({ storage: MemoryStoredFile })
	],
	providers: [BooksService],
	controllers: [BooksController]
})
export class BooksModule {}
