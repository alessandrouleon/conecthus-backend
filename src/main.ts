import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as qs from 'qs';
import { setupSwagger } from './@shared/docs/swagger/swagger.setup';
import { DomainExceptionFilter } from './@shared/domain/exception/exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('query parser', (str: string) => qs.parse(str));
  // Pipes e filtros
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new DomainExceptionFilter());

  // CORS
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  const port = process.env.PORT || process.env.BACKEND_PORT || 4000;

  setupSwagger(app);

  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
