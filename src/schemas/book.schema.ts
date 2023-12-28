import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type BookDocument = HydratedDocument<Book>
@Schema()
export class Book {
	@Prop({ unique: true, required: true, type: String })
	title: string
	@Prop({ required: true, type: String })
	subTitle: string
	@Prop({ required: true, type: Number })
	rating: number
	@Prop({ required: true, type: String })
	description: string
	@Prop({ required: true, type: String })
	image: string
	@Prop({ required: true, type: String })
	publishedAt: string
	@Prop({ required: true, type: String })
	country: string
	@Prop({ required: true, type: String })
	genre: string
	@Prop({ required: true, type: String })
	seria: string
	@Prop({ required: true, type: String })
	publishing: string
	@Prop({ required: true, type: String })
	language: string
	@Prop({ required: true, type: Number })
	pageCount: number
}

export const BookSchema = SchemaFactory.createForClass(Book)
