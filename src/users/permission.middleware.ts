import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NestMiddleware
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
	constructor(private readonly jwtService: JwtService) {}

	use(req: Request, res: Response, next: NextFunction) {
		try {
			const token = req.headers.authorization.trim()
			if (!token) throw new ForbiddenException()
			const decoded = this.jwtService.verify(token.split(' ')[1])

			if (decoded.id !== req.params.id) throw new ForbiddenException()
			next()
		} catch (error) {
			if (error) throw new ForbiddenException()
		}
	}
}
