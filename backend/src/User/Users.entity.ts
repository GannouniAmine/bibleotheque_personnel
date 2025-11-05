import { Books } from "src/Books/Books.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";


@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Column()
  nom: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

@UpdateDateColumn({ type: 'timestamp' })
updated_at: Date;

@OneToMany(() => Books, book => book.user)
   books: Books[];
}
