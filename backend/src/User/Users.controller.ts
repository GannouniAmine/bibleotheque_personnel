import { Controller, Delete, Get, Param, Post, Body, Put, UseGuards, Req } from "@nestjs/common";

import { UsersService } from "src/User/Users.service";
import { Users } from "./Users.entity";
import { ChangePasswordDTO } from "./ChangePasswordDTO";
import { JwtAuthGuard } from "src/Auth/auth-classic-strategy/jwt-auth.guard";
import { ProfileUserDto } from "./ProfileUserDto";

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}


  


  @Get('')
  findAllUsers(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get('profile')
  getProfile(@Req() req : any){
    return this.usersService.getProfile(
      req.user.userId
    );
  }

  @Get(':id')
  findOneUser(@Param('id') id: number): Promise<Users> {
    return this.usersService.findOne(id);
  }

  @Get('getByEmail/:email')
  findOneUserByEmail(@Param('email') email: string): Promise<Users> {
    return this.usersService.findOneByEmail(email);
  }

  @Put('update/:id')
  updateUser(@Param('id') id: number, @Body() user: Users): Promise<void> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  removeUser(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Put('changePassword')
  changePassword(@Body() pass: ChangePasswordDTO , @Req() req: any ){
    return this.usersService.changePassword(
       req.user.userId,
       pass.password,
       pass.newPassword
    );
    
  }

  @Put('updateProfile')
  updateProfile(@Body() user: ProfileUserDto , @Req() req: any ){
    return this.usersService.updateProfile(
       req.user.userId,
       user.email,
       user.nom
    );
  }



}
