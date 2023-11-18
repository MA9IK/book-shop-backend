import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { UserSchema } from './schemas/user.schema'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRoot(
			`mongodb+srv://Ivan:${process.env.PASSWORD_TO_DB}@cluster0.livtosq.mongodb.net/`
		),
		MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
		JwtModule.register({
			global: true,
			secret: process.env.SECCRET_CODE_JWT,
			signOptions: { expiresIn: '60s' }
		}),
		UsersModule,
		AuthModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
