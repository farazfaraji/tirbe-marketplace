import { Module } from '@nestjs/common';
import { LoggerModule, LoggerModuleAsyncParams } from 'nestjs-pino';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { TribeCoreModule } from './tribe-core/tribe-core.module';
import { VotingModule } from './voting/voting.module';
import { configuration } from './common/configuration';
import { PinoLoggerInterceptor } from './common/interceptors/pino-logger.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SellerModule } from './seller/seller.module';
import { WebhookModule } from './webhook/webhook.module';

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
    TribeCoreModule,
    VotingModule,
    SellerModule,
    WebhookModule,
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
