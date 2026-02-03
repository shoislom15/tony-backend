import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import * as fs from 'fs';
import * as path from 'path';

async function generateOpenApiSpec() {
  const app = await NestFactory.create(AppModule, { logger: false });

  app.setGlobalPrefix('api/v1');

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
All endpoints are prefixed with \`/api/v1\``,
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

  // Write JSON file
  const outputDir = path.join(__dirname, '../docs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(outputDir, 'openapi.json'),
    JSON.stringify(document, null, 2),
  );

  console.log('OpenAPI spec generated at docs/openapi.json');

  await app.close();
}

generateOpenApiSpec();
