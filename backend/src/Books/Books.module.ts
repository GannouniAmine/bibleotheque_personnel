
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/configuration/database.module';
import { BooksController } from 'src/Books/Books.controller';
import { booksRepository } from 'src/Books/Books.repository';
import { BooksService } from 'src/Books/Books.service';
import { UsersModule } from 'src/User/Users.module';



@Module({
  imports: [DatabaseModule,UsersModule],
  controllers: [BooksController],
  providers: [
    ...booksRepository,
    BooksService,
  ],
  exports: [BooksService],
})
export class BooksModule {}
