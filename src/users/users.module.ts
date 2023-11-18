import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserSchema } from 'src/schemas/user.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
