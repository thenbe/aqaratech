import { Controller, Get, Request } from '@nestjs/common';
import { Request as ERequest } from 'express';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { AppService } from './app.service';

@Controller()
@SwaggerAuth()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/profile')
  getProfile(@Request() req: ERequest & { user: IUser }) {
    console.log(req.user);
    // TODO explicitly select the properties to return
    //
    // Warning: returning the ability crashes the client/server,
    // so either don't return it, or return `rules` which is easily serialized
    // ability VS rules: https://casl.js.org/v5/en/cookbook/cache-rules#in-session-storage
    const { ability, ...result } = req.user;
    return result;
  }

  @Get('/manualmetrics')
  getMetrics() {
    return this.appService.getMetrics();
  }
}
