import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy} from 'passport-google-oauth20';
import type { ConfigType } from '@nestjs/config';
import { AuthService } from '../Auth.service';
import googleOauthConfig from './google-oauth.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private authService: AuthService,
  ) {
    super({
    clientID: googleConfiguration.clientID!,
    clientSecret: googleConfiguration.clientSecret!,
    callbackURL: googleConfiguration.callbackURL!,
    scope: ['email', 'profile'],
    });
  }

  async validate(
  profile: any,
) {
  const { emails, name, photos } = profile;

  if (!emails || emails.length === 0) {
    throw new Error('No email found in Google profile');
  }

  const user = await this.authService.SignUpGoogleUser({
    email: emails[0].value,
    firstName: name.givenName,
    lastName: name.familyName,
    avatarUrl: photos[0]?.value,
    password: 'google',
  });

  return user; 
}

}
