import { Controller, Delete, Get, Param, Post, Body, Put, UseGuards, Req } from "@nestjs/common";
import { Books } from "src/Books/Books.entity";
import { BooksService } from "src/Books/Books.service";
import { BookCreateDto } from "./BookCreateDto";
import { JwtAuthGuard } from "src/Auth/auth-classic-strategy/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('getuserBooks')
  getAllBooksByUser(@Req() req : any): Promise<Books[]> {
    return this.booksService.getAllBooksByUserId(req.user.userId);
  }

  @Get('getAllBooks')
  findAllBooks(): Promise<Books[]> {
    return this.booksService.findAll();
  }

  @Get('getBookById/:id')
  findOneBook(@Param('id') id: number): Promise<Books> {
    return this.booksService.findOne(id);
  }

  @Post('createBook')
  createBook(@Body() book: BookCreateDto , @Req() req : any): Promise<Books> {
    return this.booksService.create(
      req.user.userId ,
      book
    );
  }

  @Put('updatebook/:id')
  updateUser(@Param('id') id: number, @Body() book: Books): Promise<void> {
    return this.booksService.update(id, book);
  }

  @Delete('deletebook/:id')
  removeUser(@Param('id') id: number , @Req() req : any): Promise<void> {
    return this.booksService.remove(id);
  }

  



  
}
