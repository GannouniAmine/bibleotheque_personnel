
import { DataSource } from 'typeorm';
import { Users } from './Users.entity';

export const usersRepository = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Users),
    inject: ['DATA_SOURCE'],
  },
];
