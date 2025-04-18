/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS for frontend to communicate with backend
  app.enableCors({
    origin: 'http://localhost:3000', // Change this to your frontend port
  });

  // Use global validation pipe for incoming requests
  app.useGlobalPipes(new ValidationPipe());

  // Commented out as we're not rendering views
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');

  // Listening on port 3001 for backend
  await app.listen(3001);
}

bootstrap();