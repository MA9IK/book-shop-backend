import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	// there are swagger connecting
	const config = new DocumentBuilder()
		.setTitle('Book Shop')
		.setDescription('There are api for my BookShop full-stack project')
		.setVersion('1.0')
		.addServer('http://localhost:4000/', 'Local environment')
		// .addServer('https://staging.yourapi.com/', 'Staging')
		// .addServer('https://production.yourapi.com/', 'Production')
		.addTag('book')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api-docs', app, document)
	await app.listen(4000)
}
bootstrap()
