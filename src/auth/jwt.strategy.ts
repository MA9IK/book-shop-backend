import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserDocument } from 'src/schemas/user.schema'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

			ignoreExpiration: false,
			secretOrKey: process.env.SECRET_KEY
		})
	}

	async validate(payload: UserDocument) {
		return {
			userId: payload.id,
			username: payload.username,
			email: payload.email,
			role: payload.role
		}
	}
}
