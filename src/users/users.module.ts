import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserSchema } from 'src/schemas/user.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './user.controller'
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data'
import { HttpModule } from '@nestjs/axios'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
		NestjsFormDataModule.config({ storage: MemoryStoredFile }),
		HttpModule
	],
	providers: [UsersService],
	exports: [UsersService],
	controllers: [UserController]
})
export class UsersModule {}
