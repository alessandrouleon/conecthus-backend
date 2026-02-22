//swagger.setup.ts
import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger.config';

export function setupSwagger(app: INestApplication) {
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('user-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
