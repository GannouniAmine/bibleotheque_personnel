import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { RegisterUserDto } from "./RegisterUserDto";
import { LoginUserDto } from "./LoginUserDto";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './Auth.service';
import { GoogleAuthGuard } from "./auth-Google-strategie/google-auth.guard";
import { GithubAuthGuard } from "./auth-github-strategy/github-auth-guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('register')
    register(@Body() data: RegisterUserDto) {
        return this.authService.registerUser(data);
    }

    @Post('login')
    login(@Body() data: LoginUserDto) {
        return this.authService.signIn(data);
    }

    
    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    googleLogin() {
    }

    
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: any, @Res() res) {
    
    const tokenData = req.user;
    return res.send(`<script>
                    window.location.href = "http://localhost:3000/login/success?token=${tokenData.accessToken}";
                </script>`);
    }

    @UseGuards(GithubAuthGuard)
    @Get('github/login')
    githubLogin() {
    }

    
    @Get('github/callback')
    @UseGuards(AuthGuard('github'))
    async githubAuthRedirect(@Req() req: any, @Res() res) {
    
    const tokenData = req.user;
    return res.send(`<script>
                    window.location.href = "http://localhost:3000/login/success?token=${tokenData.accessToken}";
                </script>`);
    }


}