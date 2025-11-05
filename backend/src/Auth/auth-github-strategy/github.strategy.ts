import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2'; 
import type { ConfigType } from '@nestjs/config';
import { AuthService } from '../Auth.service';
import githubOauthConfig from './github-oauth.config';


@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    @Inject(githubOauthConfig.KEY)
    private githubConfiguration: ConfigType<typeof githubOauthConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: githubConfiguration.clientID!,
      clientSecret: githubConfiguration.clientSecret!,
      callbackURL: githubConfiguration.callbackURL!,
      scope: ['user:email'], 
    });
  }

  async validate(
  profile: any,
) {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error('No email found in GitHub profile');
  }

  const user = await this.authService.SignUpGithubUser({
    email,
    username: profile.username,
    avatarUrl: profile.photos?.[0]?.value,
    password: 'github',
  });

  return user;
}
}
