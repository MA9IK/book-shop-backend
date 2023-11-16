import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		ConfigModule.forRoot({}),
		MongooseModule.forRoot(
			`mongodb+srv://Ivan:${process.env.PASSWORD_TO_DB}@cluster0.livtosq.mongodb.net/`
		)
	],
	controllers: [],
	providers: []
})
export class AppModule {}
