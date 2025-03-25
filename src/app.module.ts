import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import {
  I18nModule,
  AcceptLanguageResolver,
  QueryResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import { LoggerModule } from 'nestjs-pino';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import KeyvRedis, { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath: path.join(__dirname, '../.env'),
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('FALLBACK_LANGUAGE'),
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return {
          stores: [
            createKeyv('redis://:redispassword@redis:6379', {
              namespace: 'AKALINTECH-nestjs-full-auth-1-',
            }),
          ],
        };
      },
      inject: [ConfigService],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'nestjs-full-auth-1-api',
        level: process.env.APP_NODE_ENV !== 'production' ? 'debug' : 'info',
        redact: [
          'req.headers.authorization',
          'req.headers.cookie',
          'res.headers["set-cookie"]',
        ],
        transport:
          process.env.APP_NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS:standard',
                  ignore: 'pid,hostname',
                },
              }
            : undefined,
        autoLogging: {
          ignore: (req) =>
            Boolean(
              req.url?.includes('health') || req.url?.includes('metrics'),
            ),
        },
        customProps: () => ({ context: 'HTTP' }),
        customLogLevel: (req, res, err) => {
          if (res.statusCode >= 500 || err) return 'error';
          if (res.statusCode >= 400) return 'warn';
          return 'info';
        },
      },
      exclude: [
        { method: RequestMethod.ALL, path: 'check' },
        { method: RequestMethod.ALL, path: 'health' },
        { method: RequestMethod.ALL, path: 'metrics' },
      ],
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
function handleConnectionError(...arguments_: any[]): void {
  throw new Error('Function not implemented.');
}
