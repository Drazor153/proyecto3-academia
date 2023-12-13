import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

const httpsOptions = {
  key: fs.readFileSync('./ssl/key.pem', 'utf8'),
  cert: fs.readFileSync('./ssl/cert.pem', 'utf8'),
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  const config = new DocumentBuilder()
    .setTitle('Enacad API')
    .setDescription('Enacad API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ limit: '5mb', extended: true }));

  app.enableCors({
    origin: [
      'https://localhost:5173',
      'https://10.242.212.120:5173',
      'https://10.242.251.119:5173',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie',
  });

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
