import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/User/Users.service';
import { LoginUserDto } from './LoginUserDto';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/User/Users.entity';
import { RegisterUserDto } from './RegisterUserDto';

@Injectable()
export class AuthService {
  constructor(
    @Inject() private usersService: UsersService,
    @Inject() private jwtService: JwtService
  ) {}

  async signIn(login  : LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(login.email);

    const isPasswordValid = await bcrypt.compare(login.password, user.password);
    if (user && !isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { id : user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registerUser(data  : RegisterUserDto): Promise<Users> {
    const user = await this.usersService.findOneByEmail(data.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new Users();
    newUser.email = data.email;
    newUser.nom = data.nom;
    newUser.password = hashedPassword;
    return await this.usersService.create(newUser); 
  }


  async SignUpGoogleUser(userData: {email: string;firstName: string;lastName: string;avatarUrl: string;password: string;}): Promise<{ accessToken: string; user: Users }> {

  let user = await this.usersService.findOneByEmail(userData.email);
  if (!user) {
    user = new Users();
    user.email = userData.email;
    user.nom = `${userData.firstName} ${userData.lastName}`;
    user.password = 'google'; 
    user = await this.usersService.create(user);
  }

  const payload = { id: user.id, email: user.email };
  return {
    accessToken: await this.jwtService.signAsync(payload),
    user,
  };
}

async SignUpGithubUser(userData: {
  email: string;
  username: string;
  avatarUrl: string;
  password: string;
}): Promise<{ accessToken: string; user: Users }> {

  let user = await this.usersService.findOneByEmail(userData.email);
  if (!user) {
    user = new Users();
    user.email = userData.email;
    user.nom = userData.username; 
    user.avatar = userData.avatarUrl; 
    user.password = userData.password; 
    user = await this.usersService.create(user);
  }

  const payload = { id: user.id, email: user.email };
  return {
    accessToken: await this.jwtService.signAsync(payload),
    user,
  };
}



}
