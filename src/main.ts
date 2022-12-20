import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: readFileSync('./localhost-key.pem'),
      cert: readFileSync('./localhost.pem'),
    },
  });

  app.use(cookieParser());
  app.enableCors({
    origin: "https://localhost:8081",
    methods: ['GET', 'PUT', 'POST', 'PATCH'],
    credentials: true,
    preflightContinue: false,
    allowedHeaders: 'Content-Type, Accept',
  });

  const config = new DocumentBuilder()
    .setTitle('osu! Ukrainian Hub')
    .setDescription('The osu! Ukrainian Hub API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(8080);
}

bootstrap();
