import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './User/Users.module';
import { BooksModule } from './Books/Books.module';
import { AuthModule } from './Auth/Auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [UsersModule, BooksModule , ConfigModule.forRoot({ isGlobal: true }) ,AuthModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
