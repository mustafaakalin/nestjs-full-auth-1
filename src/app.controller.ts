import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @CacheKey('hello')
  @CacheTTL(60000)
  @Version('1')
  @Get()
  async getHello(@I18n() i18n: I18nContext) {
    return await i18n.t('test.HELLO');
  }
}
