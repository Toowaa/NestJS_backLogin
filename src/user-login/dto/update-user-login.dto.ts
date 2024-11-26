import { PartialType } from '@nestjs/mapped-types';
import { CreateUserLoginDto } from './create-user-login.dto';
import { IsEmail } from 'class-validator';

export class UpdateUserLoginDto extends PartialType(CreateUserLoginDto) {
    firstname?: string
    lastname?: string
    @IsEmail()
    email?: string
    password?: string
    createdAt?: Date
    auth?: string
}
