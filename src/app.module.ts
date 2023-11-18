import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { UserSchema } from './schemas/user.schema'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({}),
		MongooseModule.forRoot(
			`mongodb+srv://Ivan:${process.env.PASSWORD_TO_DB}@cluster0.livtosq.mongodb.net/`
		),
		MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
		UsersModule,
		AuthModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
