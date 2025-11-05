
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/configuration/database.module';
import { UsersController } from 'src/User/Users.controller';
import { usersRepository } from 'src/User/Users.repository';
import { UsersService } from 'src/User/Users.service';


@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...usersRepository,
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
