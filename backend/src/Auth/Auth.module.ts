import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/User/Users.module';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.service';
import { JwtStrategy } from './auth-classic-strategy/jwt.strategy';
import { GoogleStrategy } from './auth-Google-strategie/google.strategy';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from './auth-Google-strategie/google-oauth.config';
import githubOauthConfig from './auth-github-strategy/github-oauth.config';
import { GithubStrategy } from './auth-github-strategy/github.strategy';



@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY, 
      signOptions: { expiresIn: '24h' },
    }), 
    ConfigModule.forFeature(googleOauthConfig),
    ConfigModule.forFeature(githubOauthConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,GoogleStrategy,GithubStrategy],
  exports: [AuthService],
})
export class AuthModule {}
