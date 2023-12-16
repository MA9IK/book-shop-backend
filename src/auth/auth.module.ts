import { Module } from '@nestjs/common'
import { AuthController } from './controller/auth.controller'
import { AuthService } from './service/auth.service'
import { UsersModule } from '../users/users.module'

@Module({
	imports: [UsersModule],
	providers: [AuthService],
	controllers: [AuthController]
})
export class AuthModule {}
