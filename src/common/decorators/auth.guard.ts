import { Injectable, CanActivate, ExecutionContext, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { RedisService, DEFAULT_REDIS_NAMESPACE } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';


@Injectable()
export class AuthGuard implements CanActivate {
  private redis: Redis

  constructor(
        protected readonly configService: ConfigService,
        private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient(DEFAULT_REDIS_NAMESPACE)
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private async validateRequest(req) {

    // if (await this.isDuplicate(req.body))
    //   throw new NotAcceptableException();

    //@todo fix this issue
    try {
      const verified = compareSync(req.headers['x-tribe-signature'], this.configService.get('tribe.signature'));
      return true
    }
    catch (e) {
      return true;
    }
  }

  private async isDuplicate(body: any) {
    console.log(body.data?.id, this.configService.get('app.duplicate_timeout'))
    console.log(await this.redis.get(`WEBHOOK_${body.data.id}`))
    if (body.data?.id) {
      if (await this.redis.get(`WEBHOOK_${body.data.id}`))
        return true
      await this.redis.setex(`WEBHOOK_${body.data.id}`, this.configService.get('app.duplicate_timeout'), 'duplicate')
    }
    return false
  }
}
