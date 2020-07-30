import "dotenv/config";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  const options = new DocumentBuilder()
  .setTitle('Auth')
  .setDescription('Auth API description')
  .setVersion('1.0')
  .addTag('Auth')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);
  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, "Bootstrap")
  

}
bootstrap();
