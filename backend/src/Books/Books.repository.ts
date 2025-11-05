import { Books } from 'src/Books/Books.entity';
import { DataSource } from 'typeorm';

export const booksRepository = [
  {
    provide: 'BOOKS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Books),
    inject: ['DATA_SOURCE'],
  },
];
