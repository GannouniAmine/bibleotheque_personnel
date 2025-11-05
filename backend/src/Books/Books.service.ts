import { Inject, Injectable } from "@nestjs/common";
import { Books } from "src/Books/Books.entity";
import { Repository } from "typeorm";
import { BookCreateDto} from "./BookCreateDto";
import { Users } from "src/User/Users.entity";
import { UsersService } from "src/User/Users.service";


@Injectable()
export class BooksService {
  constructor(
  @Inject('BOOKS_REPOSITORY')
    private booksRepository: Repository<Books>,
  @Inject()
    private userService: UsersService,
  ) {}

  async findAll(): Promise<Books[]> {
    return this.booksRepository.find();
  }

  async findOne(id: number): Promise<Books> {
      const book = await this.booksRepository.findOneBy({ id });
      if (!book) {
        throw new Error(`Book with id ${id} not found`);
      }
      return book;
    }
  
  async create(id : number , book: BookCreateDto): Promise<Books> {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      const newBook = new Books();
      newBook.titre = book.title;
      newBook.auteur = book.author;
      newBook.isbn = book.ISBN;
      newBook.date_publication = book.publicationDate;
      newBook.genre = book.genre;
      newBook.couverture_url = book.coverUrl
      newBook.user = user;
      newBook.user_id = user.id;

      return this.booksRepository.save(newBook);
  }
  
   async update(id: number, book: Books): Promise<void> { 
      await this.booksRepository.update(id, book);
  }
  
  async remove(id: number): Promise<void> {  
      await this.booksRepository.delete(id);
  }

  async getAllBooksByUserId(id: number): Promise<Books[]> {
      return this.booksRepository.find({ where: { user_id: id } });
  }



}
