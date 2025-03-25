import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import compression from '@fastify/compress';
import { Logger } from 'nestjs-pino';


declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`, 'unpkg.com'],
        styleSrc: [
          `'self'`,
          `'unsafe-inline'`,
          'cdn.jsdelivr.net',
          'fonts.googleapis.com',
          'unpkg.com',
        ],
        fontSrc: [`'self'`, 'fonts.gstatic.com', 'data:'],
        imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
        scriptSrc: [
          `'self'`,
          `https: 'unsafe-inline'`,
          `cdn.jsdelivr.net`,
          `'unsafe-eval'`,
        ],
      },
    },
    xXssProtection: false,
    xPoweredBy: false,
    xDownloadOptions: false,
    xFrameOptions: false,
    xContentTypeOptions: false,
    global: true,
  });
  await app.register(cors, {
    // put your options here
  });
  await app.register(compression);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
