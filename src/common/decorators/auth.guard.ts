import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(protected configService: ConfigService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(req) {
    //@todo fix this issue
    try {
      const verified = compareSync(req.headers['x-tribe-signature'], this.configService.get('tribe.signature'));
      return true
    }
    catch (e) {
      return true;
    }
  }
}
