import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserLoginDto } from './dto/create-user-login.dto';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';

import { UserLogin } from './entities/user-login.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { passdto } from './dto/password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserLoginService {
  constructor(@InjectRepository(UserLogin) private UserRepository: Repository<UserLogin>) { }

  async createuser(user:CreateUserLoginDto) {
    const FoundUser= await this.UserRepository.findOne({
      where:{
        email:user.email
      }
    })
    if(FoundUser){
      return new HttpException('User alredy exits pe',HttpStatus.CONFLICT)
    }
    const HashPass= await bcrypt.hash(user.password,10)
    const newuser = this.UserRepository.create({
      ...user,
      password:HashPass,
    

    });

    return this.UserRepository.save(newuser);
  }




  findAll() {
    return  this.UserRepository.find();
  }

  async findOneByEmail(email: string): Promise<any> {
    const emailFound = await this.UserRepository.findOne({
      where: { email },
      select: [ 'id','email', 'firstName','lastName','password'] 
    });

    if (!emailFound) {
      throw new HttpException(`User with email ${email} not found`,HttpStatus.NOT_FOUND);
    }

    return emailFound;
  }


  async findOne(id: number) {
     const UserFound= await this.UserRepository.findOne({
      where:{
        id:id
      }
      
    });
    if(!UserFound){
      return new HttpException(`User Not Found with id: ${id}`,HttpStatus.NOT_FOUND)
    }
    return UserFound;
  }

  async update(id: number, updateUserLoginDto: UpdateUserLoginDto) {
    if (updateUserLoginDto.password) {
      const hashPass = await bcrypt.hash(updateUserLoginDto.password, 10);
      updateUserLoginDto = {
        ...updateUserLoginDto,
        password: hashPass,
      };
    } else {
      delete updateUserLoginDto.password;
    }
    return this.UserRepository.update(id, updateUserLoginDto);
  }

 async remove(id: number) {
    const UserFound= await this.UserRepository.delete(+id);
    if(UserFound.affected===0) {
      return new HttpException('User cannot found',HttpStatus.NOT_FOUND)
    }

  }
}
