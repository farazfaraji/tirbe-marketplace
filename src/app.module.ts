import { Module } from '@nestjs/common';
import { LoggerModule, LoggerModuleAsyncParams } from 'nestjs-pino';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { TribeCoreModule } from './tribe-core/tribe-core.module';
import { configuration } from './common/configuration';
import { PinoLoggerInterceptor } from './common/interceptors/pino-logger.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SellerModule } from './seller/seller.module';
import { WebhookModule } from './webhook/webhook.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from './email/email.module';
import { BidsModule } from './bids/bids.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: configService.get('logger'),
      }),
    } as LoggerModuleAsyncParams),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('mongodb'),
      inject: [ConfigService],
    } as MongooseModuleAsyncOptions),
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
      }
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TribeCoreModule,
    SellerModule,
    WebhookModule,
    EmailModule,
    BidsModule,
  ],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: PinoLoggerInterceptor,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseLoggerInterceptor,
    // },
  ],
})
export class AppModule {
}
