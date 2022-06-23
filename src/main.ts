import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { typeOrmConfig } from './config/typeorm.config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Tenant App Api`s')
    .setDescription('The description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        name: 'Authorization',
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'Bearer',
        in: 'Header',
      },
      'authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log(
    `Server started on port 3000.\n Config: ${JSON.stringify(typeOrmConfig)}`,
  );
}
bootstrap();
