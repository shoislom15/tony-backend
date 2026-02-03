import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global response transformation
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Tony API')
    .setDescription(
      `Tony - AI-powered productivity hub backend API.

## Overview
This API provides endpoints for tasks, notes, calendar, and finance management.

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
\`Authorization: Bearer <your-token>\`

## Base URL
All endpoints are prefixed with \`/api/v1\`

## Response Format
All responses follow this format:
\`\`\`json
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

## LLM Integration
For Claude Code or other LLM tools, use the JSON spec at \`/api/docs-json\``,
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token',
      },
      'JWT-auth',
    )
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User profile management')
    .addTag('tasks', 'Task management')
    .addTag('notes', 'Notes management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Tony API Documentation',
  });

  const port = app.get(ConfigService).get<number>('PORT', 3000);
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}/api/v1`);
  console.log(`Swagger UI: http://localhost:${port}/api/docs`);
  console.log(`OpenAPI JSON: http://localhost:${port}/api/docs-json`);
}
bootstrap();
