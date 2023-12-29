import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { UserSchema } from './schemas/user.schema'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { JwtMiddleware } from './users/permission.middleware'
import { BooksModule } from './books/books.module'
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data'
@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRoot(
			`mongodb+srv://Ivan:${process.env.CONNECTION_PASS}@cluster0.livtosq.mongodb.net/`
		),
		NestjsFormDataModule.config({ storage: MemoryStoredFile }),
		// MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
		UsersModule,
		AuthModule,
		BooksModule
	],
	controllers: [],
	providers: []
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(JwtMiddleware).forRoutes('users/:id')
	}
}
