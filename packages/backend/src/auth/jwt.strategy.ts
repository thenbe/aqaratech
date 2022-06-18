import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
        jwksUri: `https://dev-eehvhdp2.eu.auth0.com/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      //   secretOrKey: jwtConstants.secret,
      // https://github.com/mikenicholson/passport-jwt#configure-strategy
      // audience: authConfig.AUTH0_API_AUDIENCE,
      // issuer: `${authConfig.AUTH0_DOMAIN}/`,
      audience: 'letand.be/api',
      issuer: `https://dev-eehvhdp2.eu.auth0.com/`, // TODO ensure backslash
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
