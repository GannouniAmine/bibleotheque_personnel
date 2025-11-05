import { Users } from "src/User/Users.entity";
import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";


@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column('text')
  auteur: string;

  @Column()
  isbn: string;

  @Column('date')
  date_publication: Date;

  @Column()
  genre: string;

  @Column('text')
  couverture_url: string;

  @Column({
    type: 'enum',
    enum: ['TO READ', 'READING', 'FINISHED' ,'ABANDONED'],
    default: 'TO READ',
  })

  status: 'TO READ' | 'READING' | 'FINISHED' | 'ABANDONED';

  @Column('date' , { nullable: true })
  date_debut_lecture: Date;

  @Column('date' , { nullable: true })
  date_fin_lecture: Date;

  @Column('int',{ nullable: true })
  note: number;

  @Column({ nullable: true })
  notes_personnelles: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;


  @ManyToOne(() => Users, user => user.books)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column('int')
  user_id: number;
}

