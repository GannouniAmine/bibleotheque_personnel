import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Users } from "./Users.entity";
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }


  async findOne(id: number): Promise<Users> {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      return user;
  }

  async create(user: Users): Promise<Users> {
      return this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<any> {
      const user = await this.usersRepository.findOneBy({ email });
      return user;
  }

  async update(id: number, user: Users): Promise<void> { 
      await this.usersRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {  
      await this.usersRepository.delete(id);
  }

  async changePassword(id : number , password : string , newPassword : string) : Promise<Users>{
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      throw new BadRequestException('Old password is incorrect');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    return await this.usersRepository.save(user);
  }

  async getProfile(id : number) : Promise<any>{
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    const data = {
      email: user.email,
      nom: user.nom,
    }
    return data;
  }

  async updateProfile(id : number , email : string , nom : string) : Promise<Users>{
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    user.nom = nom;
    user.email = email;
    return await this.usersRepository.save(user);
  }

}
